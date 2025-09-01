<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class MustVerifyPhone
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::user() ||
            (Auth::user() instanceof \App\Contracts\Auth\MustVerifyPhone &&
             ! Auth::user()->hasVerifiedPhone())) {
            return $request->expectsJson()
                    ? abort(403, 'Votre numéro de téléphone n\'est pas vérifié.')
                    : Redirect::route('verification.phone.notice');
        }
        
        return $next($request);
    }
}
