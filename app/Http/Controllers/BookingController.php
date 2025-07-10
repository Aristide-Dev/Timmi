<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Booking;
use App\Models\Child;
use App\Models\Availability;
use App\Models\Payment;
use App\Models\Notification;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmed;

class BookingController extends Controller
{
    /**
     * Afficher le formulaire de réservation pour un professeur
     */
    public function create(User $teacher, Request $request)
    {
        // Vérifier que c'est bien un professeur actif et vérifié
        if ($teacher->role !== 'teacher' || 
            $teacher->status !== 'active' || 
            !$teacher->teacherProfile || 
            !$teacher->teacherProfile->is_verified) {
            abort(404);
        }

        // Vérifier que l'utilisateur est un parent
        if ($request->user()->role !== 'parent') {
            abort(403);
        }

        $teacher->load(['teacherProfile', 'subjects', 'availabilities' => function($q) {
            $q->active();
        }]);

        $children = $request->user()->children;

        // Obtenir les créneaux disponibles pour les 30 prochains jours
        $availableSlots = $this->getAvailableSlots($teacher, 30);

        return Inertia::render('parent/create-booking', [
            'teacher' => $teacher,
            'children' => $children,
            'availableSlots' => $availableSlots,
            'commissionRate' => Setting::get('commission_rate', 20),
        ]);
    }

    /**
     * Enregistrer une nouvelle réservation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required|exists:users,id',
            'child_id' => 'required|exists:children,id',
            'subject_id' => 'required|exists:subjects,id',
            'date' => 'required|date|after:today',
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:60|max:240',
            'teaching_mode' => 'required|in:presentiel,en_ligne',
            'location' => 'required_if:teaching_mode,presentiel|nullable|string',
            'payment_method' => 'required|in:orange_money,visa,paycard',
        ]);

        // Vérifier que l'enfant appartient bien au parent
        $child = Child::where('id', $validated['child_id'])
            ->where('parent_id', $request->user()->id)
            ->firstOrFail();

        // Vérifier que le professeur enseigne bien cette matière
        $teacher = User::findOrFail($validated['teacher_id']);
        $teacherSubject = $teacher->teacherSubjects()
            ->where('subject_id', $validated['subject_id'])
            ->first();

        if (!$teacherSubject) {
            return back()->with('error', 'Ce professeur n\'enseigne pas cette matière.');
        }

        // Calculer le montant
        $hourlyRate = $teacherSubject->hourly_rate ?? $teacher->teacherProfile->hourly_rate;
        $hours = $validated['duration'] / 60;
        $amount = $hourlyRate * $hours;
        
        // Calculer la commission
        $commissionRate = Setting::get('commission_rate', 20);
        $commissionAmount = $amount * ($commissionRate / 100);
        $teacherAmount = $amount - $commissionAmount;

        // Calculer l'heure de fin
        $startTime = Carbon::createFromFormat('H:i', $validated['start_time']);
        $endTime = $startTime->copy()->addMinutes($validated['duration']);

        // Vérifier la disponibilité du professeur
        if (!$this->isTeacherAvailable($teacher, $validated['date'], $validated['start_time'], $endTime->format('H:i'))) {
            return back()->with('error', 'Le professeur n\'est pas disponible à ce créneau.');
        }

        DB::beginTransaction();
        try {
            // Créer la réservation
            $booking = Booking::create([
                'parent_id' => $request->user()->id,
                'teacher_id' => $teacher->id,
                'child_id' => $child->id,
                'subject_id' => $validated['subject_id'],
                'class_date' => $validated['date'],
                'start_time' => $validated['start_time'],
                'end_time' => $endTime->format('H:i'),
                'duration' => $validated['duration'],
                'teaching_mode' => $validated['teaching_mode'],
                'location' => $validated['location'],
                'amount' => $amount,
                'commission_rate' => $commissionRate,
                'commission_amount' => $commissionAmount,
                'teacher_amount' => $teacherAmount,
                'status' => 'pending',
                'payment_status' => 'pending',
            ]);

            // Créer le paiement
            $payment = Payment::create([
                'booking_id' => $booking->id,
                'parent_id' => $request->user()->id,
                'amount' => $amount,
                'payment_method' => $validated['payment_method'],
                'status' => 'pending',
            ]);

            // Simuler le paiement réussi (à remplacer par l'intégration réelle)
            $payment->markAsPaid();

            // Envoyer les notifications
            Mail::to($request->user()->email)
                ->send(new BookingConfirmed($booking));

            Notification::bookingConfirmed($booking);

            DB::commit();

            return redirect()->route('parent.bookings')
                ->with('success', 'Réservation créée avec succès ! Vous recevrez une confirmation par email.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Une erreur est survenue lors de la création de la réservation.');
        }
    }

    /**
     * Voir les détails d'une réservation
     */
    public function show(Booking $booking)
    {
        // Vérifier que l'utilisateur a accès à cette réservation
        $user = auth()->user();
        if (($user->role === 'parent' && $booking->parent_id !== $user->id) ||
            ($user->role === 'teacher' && $booking->teacher_id !== $user->id)) {
            abort(403);
        }

        $booking->load(['parent', 'teacher.teacherProfile', 'child', 'subject', 'payment', 'review']);

        return Inertia::render('bookings/show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Annuler une réservation
     */
    public function cancel(Booking $booking, Request $request)
    {
        // Vérifier que l'utilisateur peut annuler cette réservation
        if ($booking->parent_id !== $request->user()->id || !$booking->canBeCancelled()) {
            abort(403);
        }

        $validated = $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        DB::beginTransaction();
        try {
            // Annuler la réservation
            $booking->cancel($validated['reason']);

            // Rembourser le paiement si nécessaire
            if ($booking->payment && $booking->payment->status === 'completed') {
                $booking->payment->refund(null, 'Réservation annulée');
            }

            // Notifier le professeur
            Notification::create([
                'user_id' => $booking->teacher_id,
                'type' => 'booking_cancelled',
                'title' => 'Réservation annulée',
                'message' => "La réservation du {$booking->class_date} a été annulée par le parent.",
                'data' => ['booking_id' => $booking->id],
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Réservation annulée avec succès.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Une erreur est survenue lors de l\'annulation.');
        }
    }

    /**
     * Obtenir les créneaux disponibles d'un professeur
     */
    private function getAvailableSlots(User $teacher, int $days = 30)
    {
        $slots = collect();
        $startDate = Carbon::tomorrow();
        $endDate = $startDate->copy()->addDays($days);

        $availabilities = $teacher->availabilities()->active()->get();

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            foreach ($availabilities as $availability) {
                if ($availability->isValidForDate($date)) {
                    $daySlots = $availability->getSlotsForDate($date->format('Y-m-d'));
                    if ($daySlots->isNotEmpty()) {
                        $slots->push([
                            'date' => $date->format('Y-m-d'),
                            'day' => $date->format('l'),
                            'slots' => $daySlots,
                        ]);
                    }
                }
            }
        }

        return $slots;
    }

    /**
     * Vérifier si le professeur est disponible
     */
    private function isTeacherAvailable(User $teacher, $date, $startTime, $endTime)
    {
        // Vérifier s'il y a déjà une réservation à ce créneau
        $existingBooking = Booking::where('teacher_id', $teacher->id)
            ->where('class_date', $date)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime, $endTime])
                    ->orWhereBetween('end_time', [$startTime, $endTime])
                    ->orWhere(function ($q) use ($startTime, $endTime) {
                        $q->where('start_time', '<=', $startTime)
                            ->where('end_time', '>=', $endTime);
                    });
            })
            ->exists();

        return !$existingBooking;
    }
}
