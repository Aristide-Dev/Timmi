<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Affiche la page d'accueil avec les données nécessaires
     */
    public function index(Request $request): Response
    {
        $stats = $this->getStats();

        return Inertia::render('home', [
            'stats' => $stats,
        ]);
    }

    /**
     * Récupère les statistiques du site
     */
    private function getStats(): array
    {
        return [
            'total_users' => 8547,
            'total_articles' => 1234,
            'total_services' => 856,
        ];
    }
} 