<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\Booking;
use App\Traits\HandlesPagination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    use HandlesPagination;
    /**
     * Afficher la liste des feedbacks de l'étudiant
     */
    public function index()
    {
        $student = auth()->user();
        
        $feedbacks = Feedback::where('student_id', $student->id)
            ->with(['professor', 'booking'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Student/Feedback/Index', [
            'feedbacks' => $this->formatPaginatedData($feedbacks)
        ]);
    }

    /**
     * Afficher le formulaire de création de feedback
     */
    public function create(Booking $booking)
    {
        // Vérifier que la réservation appartient à l'étudiant
        if ($booking->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas donner de feedback pour cette réservation.');
        }

        // Vérifier que la session est terminée
        if ($booking->status !== 'completed') {
            abort(403, 'Vous ne pouvez donner un feedback qu\'après la fin de la session.');
        }

        // Vérifier qu'il n'y a pas déjà un feedback pour cette réservation
        $existingFeedback = Feedback::where('booking_id', $booking->id)->first();
        if ($existingFeedback) {
            return redirect()->route('student.feedback.edit', $existingFeedback);
        }

        return Inertia::render('Student/Feedback/Create', [
            'booking' => $booking->load(['professor', 'subject', 'level'])
        ]);
    }

    /**
     * Enregistrer un nouveau feedback
     */
    public function store(Request $request, Booking $booking)
    {
        // Vérifier que la réservation appartient à l'étudiant
        if ($booking->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas donner de feedback pour cette réservation.');
        }

        // Vérifier que la session est terminée
        if ($booking->status !== 'completed') {
            abort(403, 'Vous ne pouvez donner un feedback qu\'après la fin de la session.');
        }

        // Vérifier qu'il n'y a pas déjà un feedback pour cette réservation
        $existingFeedback = Feedback::where('booking_id', $booking->id)->first();
        if ($existingFeedback) {
            return redirect()->route('student.feedback.edit', $existingFeedback);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'would_recommend' => 'boolean'
        ]);

        Feedback::create([
            'booking_id' => $booking->id,
            'professor_id' => $booking->professor_id,
            'student_id' => auth()->id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'would_recommend' => $request->boolean('would_recommend', false)
        ]);

        return redirect()->route('student.feedback.index')
            ->with('success', 'Votre feedback a été enregistré avec succès.');
    }

    /**
     * Afficher le formulaire d'édition de feedback
     */
    public function edit(Feedback $feedback)
    {
        // Vérifier que le feedback appartient à l'étudiant
        if ($feedback->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas modifier ce feedback.');
        }

        return Inertia::render('Student/Feedback/Edit', [
            'feedback' => $feedback->load(['professor', 'booking'])
        ]);
    }

    /**
     * Mettre à jour un feedback
     */
    public function update(Request $request, Feedback $feedback)
    {
        // Vérifier que le feedback appartient à l'étudiant
        if ($feedback->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas modifier ce feedback.');
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'would_recommend' => 'boolean'
        ]);

        $feedback->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
            'would_recommend' => $request->boolean('would_recommend', false)
        ]);

        return redirect()->route('student.feedback.index')
            ->with('success', 'Votre feedback a été mis à jour avec succès.');
    }

    /**
     * Supprimer un feedback
     */
    public function destroy(Feedback $feedback)
    {
        // Vérifier que le feedback appartient à l'étudiant
        if ($feedback->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas supprimer ce feedback.');
        }

        $feedback->delete();

        return redirect()->route('student.feedback.index')
            ->with('success', 'Votre feedback a été supprimé avec succès.');
    }
}