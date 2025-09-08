<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Professor;
use App\Traits\HandlesPagination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    use HandlesPagination;
    /**
     * Afficher la liste des avis de l'étudiant
     */
    public function index()
    {
        $student = auth()->user();
        
        $reviews = Review::where('student_id', $student->id)
            ->with(['professor'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Student/Reviews/Index', [
            'reviews' => $this->formatPaginatedData($reviews)
        ]);
    }

    /**
     * Afficher le formulaire de création d'avis
     */
    public function create(Professor $professor)
    {
        return Inertia::render('Student/Reviews/Create', [
            'professor' => $professor
        ]);
    }

    /**
     * Enregistrer un nouvel avis
     */
    public function store(Request $request, Professor $professor)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'comment' => 'required|string|max:1000',
            'would_recommend' => 'boolean'
        ]);

        // Vérifier qu'il n'y a pas déjà un avis pour ce professeur
        $existingReview = Review::where('professor_id', $professor->id)
            ->where('student_id', auth()->id())
            ->first();

        if ($existingReview) {
            return redirect()->route('student.reviews.edit', $existingReview)
                ->with('error', 'Vous avez déjà donné un avis pour ce professeur.');
        }

        Review::create([
            'professor_id' => $professor->id,
            'student_id' => auth()->id(),
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'would_recommend' => $request->boolean('would_recommend', false)
        ]);

        return redirect()->route('student.reviews.index')
            ->with('success', 'Votre avis a été enregistré avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'avis
     */
    public function edit(Review $review)
    {
        // Vérifier que l'avis appartient à l'étudiant
        if ($review->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas modifier cet avis.');
        }

        return Inertia::render('Student/Reviews/Edit', [
            'review' => $review->load('professor')
        ]);
    }

    /**
     * Mettre à jour un avis
     */
    public function update(Request $request, Review $review)
    {
        // Vérifier que l'avis appartient à l'étudiant
        if ($review->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas modifier cet avis.');
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'comment' => 'required|string|max:1000',
            'would_recommend' => 'boolean'
        ]);

        $review->update([
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'would_recommend' => $request->boolean('would_recommend', false)
        ]);

        return redirect()->route('student.reviews.index')
            ->with('success', 'Votre avis a été mis à jour avec succès.');
    }

    /**
     * Supprimer un avis
     */
    public function destroy(Review $review)
    {
        // Vérifier que l'avis appartient à l'étudiant
        if ($review->student_id !== auth()->id()) {
            abort(403, 'Vous ne pouvez pas supprimer cet avis.');
        }

        $review->delete();

        return redirect()->route('student.reviews.index')
            ->with('success', 'Votre avis a été supprimé avec succès.');
    }
}