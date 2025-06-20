<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Gestionnaire d'erreur personnalisé pour les pages d'erreur React
        $exceptions->render(function (Throwable $e, $request) {
            if (!$request->expectsJson()) {
                // Vérifier si c'est une exception d'authentification
                if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                    // Laisser Laravel gérer la redirection vers login
                    return null;
                }
                
                $statusCode = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500;
                
                // Définir les pages d'erreur disponibles
                $errorPages = [
                    400 => 'errors/400',
                    // 401 retiré pour permettre la redirection vers login
                    403 => 'errors/403',
                    404 => 'errors/404',
                    405 => 'errors/405',
                    419 => 'errors/419',
                    422 => 'errors/422',
                    429 => 'errors/429',
                    500 => 'errors/500',
                    503 => 'errors/503',
                ];

                // Utiliser la page d'erreur personnalisée si elle existe
                if (array_key_exists($statusCode, $errorPages)) {
                    return Inertia::render($errorPages[$statusCode])
                        ->toResponse($request)
                        ->setStatusCode($statusCode);
                }

                // Fallback vers la page 500 pour les autres erreurs
                if ($statusCode >= 500) {
                    return Inertia::render('errors/500')
                        ->toResponse($request)
                        ->setStatusCode($statusCode);
                }

                // Fallback vers la page 404 pour les erreurs client
                return Inertia::render('errors/404')
                    ->toResponse($request)
                    ->setStatusCode(404);
            }
        });
    })
    ->create();
