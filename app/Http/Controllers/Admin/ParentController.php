<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Child;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParentController extends Controller
{
    /**
     * Afficher la liste des parents
     */
    public function index(Request $request): Response
    {
        $query = User::whereHas('roles', function ($q) {
            $q->where('slug', 'parent');
        })->with(['roles', 'children', 'bookings']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->whereNotNull('email_verified_at');
            } elseif ($request->status === 'inactive') {
                $query->whereNull('email_verified_at');
            }
        }

        if ($request->filled('has_children')) {
            if ($request->boolean('has_children')) {
                $query->whereHas('children');
            } else {
                $query->whereDoesntHave('children');
            }
        }

        if ($request->filled('has_bookings')) {
            if ($request->boolean('has_bookings')) {
                $query->whereHas('bookings');
            } else {
                $query->whereDoesntHave('bookings');
            }
        }

        $parents = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Parents/Index', [
            'parents' => $parents,
            'filters' => $request->only(['search', 'status', 'has_children', 'has_bookings']),
        ]);
    }

    /**
     * Afficher les détails d'un parent
     */
    public function show(User $parent): Response
    {
        $parent->load([
            'roles', 'children', 'bookings' => function ($query) {
                $query->with(['professor', 'child', 'subject', 'level'])
                      ->orderBy('created_at', 'desc');
            }
        ]);

        // Statistiques du parent
        $stats = [
            'total_children' => $parent->children()->count(),
            'total_bookings' => $parent->bookings()->count(),
            'total_spent' => $parent->bookings()->where('status', 'completed')->sum('total_price'),
            'active_bookings' => $parent->bookings()->whereIn('status', ['pending', 'confirmed'])->count(),
            'completed_bookings' => $parent->bookings()->where('status', 'completed')->count(),
            'last_booking' => $parent->bookings()->latest()->first()?->created_at?->format('Y-m-d H:i:s'),
        ];

        return Inertia::render('Admin/Parents/Show', [
            'parent' => $parent,
            'stats' => $stats,
        ]);
    }

    /**
     * Afficher les enfants d'un parent
     */
    public function children(User $parent): Response
    {
        $children = $parent->children()->with(['bookings' => function ($query) {
            $query->with(['professor', 'subject', 'level'])
                  ->orderBy('created_at', 'desc');
        }])->get();

        return Inertia::render('Admin/Parents/Children', [
            'parent' => $parent,
            'children' => $children,
        ]);
    }

    /**
     * Afficher les réservations d'un parent
     */
    public function bookings(User $parent): Response
    {
        $bookings = $parent->bookings()
            ->with(['professor', 'child', 'subject', 'level'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Parents/Bookings', [
            'parent' => $parent,
            'bookings' => $bookings,
        ]);
    }

    /**
     * Suspendre/Activer un parent
     */
    public function toggleStatus(User $parent): RedirectResponse
    {
        $parent->update(['is_available' => !$parent->is_available]);

        $status = $parent->is_available ? 'activé' : 'suspendu';

        return back()->with('success', "Parent {$status} avec succès.");
    }

    /**
     * Supprimer un parent
     */
    public function destroy(User $parent): RedirectResponse
    {
        // Vérifier s'il y a des réservations actives
        $activeBookings = $parent->bookings()
            ->whereIn('status', ['pending', 'confirmed'])
            ->count();

        if ($activeBookings > 0) {
            return back()->with('error', 'Impossible de supprimer ce parent car il a des réservations actives.');
        }

        // Supprimer les enfants associés
        $parent->children()->delete();

        $parent->delete();

        return redirect()->route('admin.parents.index')
            ->with('success', 'Parent supprimé avec succès.');
    }
}
