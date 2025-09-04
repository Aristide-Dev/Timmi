<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    /**
     * Afficher la liste des feedbacks
     */
    public function index(Request $request): Response
    {
        $query = Feedback::with(['session.booking.professor', 'session.booking.parent', 'session.booking.child']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('comment', 'like', "%{$search}%")
                  ->orWhereHas('session.booking.professor', function ($profQuery) use ($search) {
                      $profQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('session.booking.parent', function ($parentQuery) use ($search) {
                      $parentQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        if ($request->filled('is_resolved')) {
            $query->where('is_resolved', $request->boolean('is_resolved'));
        }

        if ($request->filled('professor')) {
            $query->whereHas('session.booking', function ($q) use ($request) {
                $q->where('professor_id', $request->professor);
            });
        }

        if ($request->filled('parent')) {
            $query->whereHas('session.booking', function ($q) use ($request) {
                $q->where('parent_id', $request->parent);
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $feedbacks = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Feedback/Index', [
            'feedbacks' => $feedbacks,
            'filters' => $request->only([
                'search', 'rating', 'is_resolved', 'professor', 'parent', 'date_from', 'date_to'
            ]),
        ]);
    }

    /**
     * Afficher les détails d'un feedback
     */
    public function show(Feedback $feedback): Response
    {
        $feedback->load([
            'session.booking.professor.roles', 
            'session.booking.parent.roles', 
            'session.booking.child',
            'session.booking.subject',
            'session.booking.level'
        ]);

        return Inertia::render('Admin/Feedback/Show', [
            'feedback' => $feedback,
        ]);
    }

    /**
     * Répondre à un feedback
     */
    public function respond(Request $request, Feedback $feedback): RedirectResponse
    {
        $validated = $request->validate([
            'admin_response' => 'required|string|max:1000',
        ]);

        $feedback->update([
            'admin_response' => $validated['admin_response'],
            'resolved_by' => auth()->user()->name,
            'resolved_at' => now(),
        ]);

        return back()->with('success', 'Réponse ajoutée avec succès.');
    }

    /**
     * Marquer un feedback comme résolu
     */
    public function resolve(Feedback $feedback): RedirectResponse
    {
        $feedback->update([
            'is_resolved' => true,
            'resolved_by' => auth()->user()->name,
            'resolved_at' => now(),
        ]);

        return back()->with('success', 'Feedback marqué comme résolu.');
    }

    /**
     * Marquer un feedback comme non résolu
     */
    public function unresolve(Feedback $feedback): RedirectResponse
    {
        $feedback->update([
            'is_resolved' => false,
            'resolved_by' => null,
            'resolved_at' => null,
        ]);

        return back()->with('success', 'Feedback marqué comme non résolu.');
    }

    /**
     * Supprimer un feedback
     */
    public function destroy(Feedback $feedback): RedirectResponse
    {
        $feedback->delete();

        return redirect()->route('admin.feedback.index')
            ->with('success', 'Feedback supprimé avec succès.');
    }

    /**
     * Statistiques des feedbacks
     */
    public function stats(): Response
    {
        $stats = [
            'total_feedbacks' => Feedback::count(),
            'resolved_feedbacks' => Feedback::where('is_resolved', true)->count(),
            'unresolved_feedbacks' => Feedback::where('is_resolved', false)->count(),
            'average_rating' => Feedback::avg('rating') ?? 0,
            'rating_distribution' => Feedback::selectRaw('rating, COUNT(*) as count')
                ->groupBy('rating')
                ->orderBy('rating')
                ->get(),
            'category_ratings' => [
                'teaching_quality' => Feedback::avg('teaching_quality') ?? 0,
                'punctuality' => Feedback::avg('punctuality') ?? 0,
                'communication' => Feedback::avg('communication') ?? 0,
                'patience' => Feedback::avg('patience') ?? 0,
            ],
        ];

        return Inertia::render('Admin/Feedback/Stats', [
            'stats' => $stats,
        ]);
    }
}
