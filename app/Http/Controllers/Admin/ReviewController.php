<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Afficher la liste des avis
     */
    public function index(Request $request): Response
    {
        $query = Review::with(['professor', 'parent', 'booking']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('comment', 'like', "%{$search}%")
                  ->orWhereHas('professor', function ($profQuery) use ($search) {
                      $profQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('parent', function ($parentQuery) use ($search) {
                      $parentQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        if ($request->filled('professor')) {
            $query->where('professor_id', $request->professor);
        }

        if ($request->filled('moderation_status')) {
            $query->where('moderation_status', $request->moderation_status);
        }

        if ($request->filled('is_verified')) {
            $query->where('is_verified', $request->boolean('is_verified'));
        }

        if ($request->filled('is_featured')) {
            $query->where('is_featured', $request->boolean('is_featured'));
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $reviews = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
            'filters' => $request->only([
                'search', 'rating', 'professor', 'moderation_status', 
                'is_verified', 'is_featured', 'date_from', 'date_to'
            ]),
        ]);
    }

    /**
     * Afficher les détails d'un avis
     */
    public function show(Review $review): Response
    {
        $review->load([
            'professor.roles', 'parent.roles', 'booking.subject', 'booking.level'
        ]);

        return Inertia::render('Admin/Reviews/Show', [
            'review' => $review,
        ]);
    }

    /**
     * Modérer un avis
     */
    public function moderate(Request $request, Review $review): RedirectResponse
    {
        $validated = $request->validate([
            'moderation_status' => 'required|in:pending,approved,rejected',
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $review->update([
            'moderation_status' => $validated['moderation_status'],
            'moderated_by' => auth()->user()->name,
            'moderated_at' => now(),
            'admin_notes' => $validated['admin_notes'] ?? $review->admin_notes,
        ]);

        return back()->with('success', 'Avis modéré avec succès.');
    }

    /**
     * Toggle le statut de vérification d'un avis
     */
    public function toggleVerification(Review $review): RedirectResponse
    {
        $review->update(['is_verified' => !$review->is_verified]);

        $status = $review->is_verified ? 'vérifié' : 'non vérifié';

        return back()->with('success', "Avis {$status} avec succès.");
    }

    /**
     * Toggle le statut de mise en avant d'un avis
     */
    public function toggleFeatured(Review $review): RedirectResponse
    {
        $review->update(['is_featured' => !$review->is_featured]);

        $status = $review->is_featured ? 'mis en avant' : 'retiré de la mise en avant';

        return back()->with('success', "Avis {$status} avec succès.");
    }

    /**
     * Supprimer un avis
     */
    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return redirect()->route('admin.reviews.index')
            ->with('success', 'Avis supprimé avec succès.');
    }

    /**
     * Statistiques des avis
     */
    public function stats(): Response
    {
        $stats = [
            'total_reviews' => Review::count(),
            'pending_reviews' => Review::where('moderation_status', 'pending')->count(),
            'approved_reviews' => Review::where('moderation_status', 'approved')->count(),
            'rejected_reviews' => Review::where('moderation_status', 'rejected')->count(),
            'verified_reviews' => Review::where('is_verified', true)->count(),
            'featured_reviews' => Review::where('is_featured', true)->count(),
            'average_rating' => Review::avg('rating') ?? 0,
            'rating_distribution' => Review::selectRaw('rating, COUNT(*) as count')
                ->groupBy('rating')
                ->orderBy('rating')
                ->get(),
        ];

        return Inertia::render('Admin/Reviews/Stats', [
            'stats' => $stats,
        ]);
    }
}
