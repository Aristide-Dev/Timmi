<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Subject;
use App\Models\Level;
use App\Traits\HandlesPagination;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class BookingController extends Controller
{
    use HandlesPagination;
    public function index(Request $request)
    {
        $user = $request->user();
        
        $bookings = $user->studentBookings()
            ->with(['professor', 'subject', 'level', 'sessions'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Student/Bookings/Index', [
            'bookings' => $this->formatPaginatedData($bookings),
        ]);
    }

    public function create(Request $request)
    {
        $professorId = $request->get('professor_id');
        $professor = null;
        
        if ($professorId) {
            $professor = User::whereHas('roles', function ($q) {
                $q->where('slug', 'professor');
            })->with(['subjects', 'levels', 'cities'])->find($professorId);
        }

        return Inertia::render('Student/Bookings/Create', [
            'professor' => $professor,
            'subjects' => Subject::all(),
            'levels' => Level::all(),
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'professor_id' => 'required|exists:users,id',
            'subject_id' => 'required|exists:subjects,id',
            'level_id' => 'required|exists:levels,id',
            'date' => 'required|date|after:today',
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:30|max:240',
            'notes' => 'nullable|string|max:1000',
        ]);

        $professor = User::findOrFail($request->professor_id);
        
        // Calculer le prix total
        $totalPrice = ($professor->hourly_rate * $request->duration) / 60;
        
        // Calculer l'heure de fin
        $startTime = Carbon::createFromFormat('Y-m-d H:i', $request->date . ' ' . $request->start_time);
        $endTime = $startTime->copy()->addMinutes($request->duration);

        $booking = Booking::create([
            'student_id' => $user->id,
            'professor_id' => $request->professor_id,
            'subject_id' => $request->subject_id,
            'level_id' => $request->level_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $endTime->format('H:i'),
            'duration' => $request->duration,
            'total_price' => $totalPrice,
            'status' => 'pending',
            'payment_status' => 'pending',
            'notes' => $request->notes,
            'booking_type' => 'student_direct',
        ]);

        return redirect()->route('student.bookings.show', $booking)
            ->with('success', 'Réservation créée avec succès. En attente de confirmation du professeur.');
    }

    public function show(Booking $booking)
    {
        $this->authorize('view', $booking);
        
        $booking->load(['professor', 'subject', 'level', 'sessions']);
        
        return Inertia::render('Student/Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    public function edit(Booking $booking)
    {
        $this->authorize('update', $booking);
        
        $booking->load(['professor', 'subject', 'level']);
        
        return Inertia::render('Student/Bookings/Edit', [
            'booking' => $booking,
            'subjects' => Subject::all(),
            'levels' => Level::all(),
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $this->authorize('update', $booking);
        
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'level_id' => 'required|exists:levels,id',
            'date' => 'required|date|after:today',
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:30|max:240',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Recalculer le prix si nécessaire
        $professor = $booking->professor;
        $totalPrice = ($professor->hourly_rate * $request->duration) / 60;
        
        $startTime = Carbon::createFromFormat('Y-m-d H:i', $request->date . ' ' . $request->start_time);
        $endTime = $startTime->copy()->addMinutes($request->duration);

        $booking->update([
            'subject_id' => $request->subject_id,
            'level_id' => $request->level_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $endTime->format('H:i'),
            'duration' => $request->duration,
            'total_price' => $totalPrice,
            'notes' => $request->notes,
            'status' => 'pending', // Remettre en attente pour validation
        ]);

        return redirect()->route('student.bookings.show', $booking)
            ->with('success', 'Réservation mise à jour avec succès.');
    }

    public function cancel(Booking $booking)
    {
        $this->authorize('cancel', $booking);
        
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return back()->with('error', 'Cette réservation ne peut pas être annulée.');
        }

        $booking->update([
            'status' => 'cancelled',
        ]);

        return back()->with('success', 'Réservation annulée avec succès.');
    }
}
