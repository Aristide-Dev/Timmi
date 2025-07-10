<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $authData = [
            'user' => null,
        ];

        if ($user) {
            $authData['user'] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                'phone' => $user->phone,
                'city' => $user->city,
            ];

            // Ajouter des données spécifiques selon le rôle
            switch ($user->role) {
                case 'parent':
                    $authData['user']['children'] = $user->children()->get();
                    $authData['user']['active_bookings_count'] = $user->bookingsAsParent()
                        ->whereIn('status', ['pending', 'confirmed'])
                        ->count();
                    break;

                case 'teacher':
                    $authData['user']['profile'] = $user->teacherProfile;
                    $authData['user']['subjects'] = $user->subjects()->get();
                    $authData['user']['upcoming_classes_count'] = $user->bookingsAsTeacher()
                        ->whereIn('status', ['confirmed'])
                        ->where('class_date', '>=', today())
                        ->count();
                    $authData['user']['is_profile_complete'] = $user->teacherProfile && 
                        $user->teacherProfile->bio && 
                        $user->subjects()->exists();
                    break;

                case 'admin':
                    $authData['user']['pending_teachers_count'] = \App\Models\User::where('role', 'teacher')
                        ->where('status', 'pending')
                        ->count();
                    $authData['user']['pending_bookings_count'] = \App\Models\Booking::where('status', 'pending')
                        ->count();
                    break;
            }

            // Ajouter les notifications non lues
            $authData['user']['unread_notifications_count'] = $user->notifications()
                ->unread()
                ->count();
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => $authData,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
