<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Child;
use App\Models\Subject;
use App\Models\Level;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Afficher la liste des réservations du parent
     */
    public function index()
    {
        $bookings = Booking::where('parent_id', Auth::id())
            ->with(['professor', 'child', 'subject', 'level'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('status');

        return Inertia::render('Parent/Booking/Index', [
            'bookings' => [
                'pending' => $bookings->get('pending', collect()),
                'confirmed' => $bookings->get('confirmed', collect()),
                'completed' => $bookings->get('completed', collect()),
                'cancelled' => $bookings->get('cancelled', collect()),
            ]
        ]);
    }

    /**
     * Afficher les détails d'une réservation
     */
    public function show(Booking $booking)
    {
        // Vérifier que la réservation appartient au parent connecté
        if ($booking->parent_id !== Auth::id()) {
            abort(403);
        }

        $booking->load(['professor', 'child', 'subject', 'level']);

        return Inertia::render('Parent/Booking/Show', [
            'booking' => $booking
        ]);
    }

    /**
     * Afficher le formulaire d'édition d'une réservation
     */
    public function edit(Booking $booking)
    {
        // Vérifier que la réservation appartient au parent connecté
        if ($booking->parent_id !== Auth::id()) {
            abort(403);
        }

        // Vérifier que la réservation peut être modifiée
        if ($booking->status !== 'pending') {
            return redirect()->route('parent.bookings.show', $booking)
                ->with('error', 'Cette réservation ne peut plus être modifiée.');
        }

        $booking->load(['professor', 'child', 'subject', 'level']);
        
        $children = Child::where('parent_id', Auth::id())->get();
        $subjects = Subject::where('is_active', true)->orderBy('name')->get();
        $levels = Level::where('is_active', true)->orderBy('sort_order')->get();

        return Inertia::render('Parent/Booking/Edit', [
            'booking' => $booking,
            'children' => $children,
            'subjects' => $subjects,
            'levels' => $levels,
        ]);
    }

    /**
     * Mettre à jour une réservation
     */
    public function update(Request $request, Booking $booking)
    {
        // Vérifier que la réservation appartient au parent connecté
        if ($booking->parent_id !== Auth::id()) {
            abort(403);
        }

        // Vérifier que la réservation peut être modifiée
        if ($booking->status !== 'pending') {
            return redirect()->route('parent.bookings.show', $booking)
                ->with('error', 'Cette réservation ne peut plus être modifiée.');
        }

        $request->validate([
            'child_id' => 'required|exists:children,id',
            'subject_id' => 'required|exists:subjects,id',
            'level_id' => 'required|exists:levels,id',
            'duration' => 'required|integer|min:30|max:240',
            'notes' => 'nullable|string|max:500',
        ]);

        // Calculer le nouveau prix total
        $hours = $request->duration / 60;
        $totalPrice = $booking->professor->hourly_rate * $hours;

        $booking->update([
            'child_id' => $request->child_id,
            'subject_id' => $request->subject_id,
            'level_id' => $request->level_id,
            'duration' => $request->duration,
            'total_price' => $totalPrice,
            'notes' => $request->notes,
        ]);

        return redirect()->route('parent.bookings.show', $booking)
            ->with('success', 'Réservation mise à jour avec succès.');
    }

    /**
     * Annuler une réservation
     */
    public function cancel(Booking $booking)
    {
        // Vérifier que la réservation appartient au parent connecté
        if ($booking->parent_id !== Auth::id()) {
            abort(403);
        }

        // Vérifier que la réservation peut être annulée
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return redirect()->route('parent.bookings.show', $booking)
                ->with('error', 'Cette réservation ne peut plus être annulée.');
        }

        $booking->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancelled_by' => 'parent'
        ]);

        return redirect()->route('parent.bookings.index')
            ->with('success', 'Réservation annulée avec succès.');
    }
    public function create(Request $request)
    {
        $user = $request->user();
        $professorId = $request->get('professor_id');
        
        if (!$professorId) {
            return redirect()->route('parent.search.professors');
        }
        
        $professor = User::whereHas('roles', function ($q) {
            $q->where('slug', 'professor');
        })->with(['subjects', 'levels'])->findOrFail($professorId);
        
        $children = Child::where('parent_id', $user->id)->get();
        $subjects = Subject::where('is_active', true)->orderBy('name')->get();
        $levels = Level::where('is_active', true)->orderBy('sort_order')->get();
        
        return Inertia::render('Parent/Booking/Create', [
            'professor' => $professor,
            'children' => $children,
            'subjects' => $subjects,
            'levels' => $levels,
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'professor_id' => 'required|exists:users,id',
            'child_id' => 'required|exists:children,id',
            'subject_id' => 'required|exists:subjects,id',
            'level_id' => 'required|exists:levels,id',
            'duration' => 'required|integer|min:30|max:240',
            'notes' => 'nullable|string|max:500',
            'payment_method' => 'required|in:card,mobile_money,bank_transfer',
        ]);
        
        $user = $request->user();
        $professorId = $request->get('professor_id');
        
        $professor = User::whereHas('roles', function ($q) {
            $q->where('slug', 'professor');
        })->findOrFail($professorId);
        
        // Calculer le prix total
        $hours = $request->duration / 60;
        $totalPrice = $professor->hourly_rate * $hours;
        
        // Créer la réservation
        $booking = Booking::create([
            'parent_id' => $user->id,
            'professor_id' => $professorId,
            'child_id' => $request->child_id,
            'subject_id' => $request->subject_id,
            'level_id' => $request->level_id,
            'duration' => $request->duration,
            'total_price' => $totalPrice,
            'status' => 'pending',
            'payment_status' => 'pending',
            'notes' => $request->notes,
            'payment_method' => $request->payment_method,
        ]);
        
        return redirect()->route('parent.dashboard')
            ->with('success', 'Réservation créée avec succès ! Le professeur confirmera dans les 24h.');
    }
}
