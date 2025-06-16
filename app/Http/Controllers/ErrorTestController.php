<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ErrorTestController extends Controller
{
    /**
     * Affiche la liste de toutes les pages d'erreur disponibles
     */
    public function index(): Response
    {
        $errors = [
            400 => [
                'title' => 'Bad Request',
                'description' => 'Requête incorrecte'
            ],
            401 => [
                'title' => 'Unauthorized', 
                'description' => 'Accès non autorisé'
            ],
            403 => [
                'title' => 'Forbidden',
                'description' => 'Accès interdit'
            ],
            404 => [
                'title' => 'Not Found',
                'description' => 'Page introuvable'
            ],
            405 => [
                'title' => 'Method Not Allowed',
                'description' => 'Méthode non autorisée'
            ],
            419 => [
                'title' => 'Page Expired',
                'description' => 'Page expirée (CSRF)'
            ],
            422 => [
                'title' => 'Unprocessable Entity',
                'description' => 'Données non valides'
            ],
            429 => [
                'title' => 'Too Many Requests',
                'description' => 'Trop de requêtes'
            ],
            500 => [
                'title' => 'Internal Server Error',
                'description' => 'Erreur serveur interne'
            ],
            503 => [
                'title' => 'Service Unavailable',
                'description' => 'Service indisponible'
            ],
        ];

        return Inertia::render('error-test-index', [
            'errors' => $errors
        ]);
    }

    /**
     * Simule une erreur spécifique pour tester l'affichage
     */
    public function show(int $code): never
    {
        // Valider que le code d'erreur est supporté
        $supportedCodes = [400, 401, 403, 404, 405, 419, 422, 429, 500, 503];
        
        if (!in_array($code, $supportedCodes)) {
            abort(404, 'Code d\'erreur non supporté');
        }

        // Déclencher l'erreur correspondante
        abort($code, $this->getErrorMessage($code));
    }

    /**
     * Retourne le message d'erreur pour un code donné
     */
    private function getErrorMessage(int $code): string
    {
        $messages = [
            400 => 'Test d\'une requête incorrecte',
            401 => 'Test d\'un accès non autorisé', 
            403 => 'Test d\'un accès interdit',
            404 => 'Test d\'une page introuvable',
            405 => 'Test d\'une méthode non autorisée',
            419 => 'Test d\'une page expirée',
            422 => 'Test de données non valides',
            429 => 'Test de trop de requêtes',
            500 => 'Test d\'une erreur serveur',
            503 => 'Test d\'un service indisponible',
        ];

        return $messages[$code] ?? 'Erreur de test';
    }
} 