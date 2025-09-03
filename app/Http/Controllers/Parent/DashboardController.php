<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Booking;
use App\Models\Session;
use App\Models\Child;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Récupérer les enfants du parent avec leurs matières
        $children = Child::where('parent_id', $user->id)
            ->with(['bookings.subject'])
            ->get()
            ->map(function ($child) {
                // Extraire les matières uniques des réservations
                $subjects = $child->bookings->pluck('subject.name')->unique()->values()->toArray();
                $child->subjects = $subjects;
                return $child;
            });
        
        // Statistiques
        $totalChildren = $children->count();
        $activeBookings = Booking::where('parent_id', $user->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->count();
        $completedSessions = Session::whereHas('booking', function ($query) use ($user) {
            $query->where('parent_id', $user->id);
        })->where('status', 'completed')->count();
        $totalSpent = Booking::where('parent_id', $user->id)
            ->where('payment_status', 'paid')
            ->sum('total_price');
        
        // Prochaines sessions
        $upcomingSessions = Session::whereHas('booking', function ($query) use ($user) {
            $query->where('parent_id', $user->id);
        })
        ->with(['booking.professor', 'booking.child', 'booking.subject'])
        ->where('status', 'scheduled')
        ->orderBy('created_at')
        ->limit(5)
        ->get();
        
        // Réservations récentes
        $recentBookings = Booking::where('parent_id', $user->id)
            ->with(['professor', 'child', 'subject'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();
        
        $dashboard = [
            'total_children' => $totalChildren,
            'active_bookings' => $activeBookings,
            'completed_sessions' => $completedSessions,
            'total_spent' => $totalSpent,
            'upcoming_sessions' => $upcomingSessions,
            'recent_bookings' => $recentBookings,
            'children' => $children,
        ];
        
        return Inertia::render('Parent/Dashboard/Index', [
            'dashboard' => $dashboard,
        ]);
    }
}
