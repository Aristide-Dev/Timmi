<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTeacherStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role === 'teacher') {
            // Vérifier si le compte du professeur est actif
            if ($request->user()->status !== 'active') {
                return redirect()->route('teacher.pending')
                    ->with('warning', 'Votre compte est en attente de validation par l\'administrateur.');
            }

            // Vérifier si le profil du professeur est vérifié
            if ($request->user()->teacherProfile && !$request->user()->teacherProfile->is_verified) {
                return redirect()->route('teacher.profile.complete')
                    ->with('info', 'Veuillez compléter votre profil pour être vérifié.');
            }
        }

        return $next($request);
    }
}
