<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PagesController extends Controller
{
    /**
     * Affiche la page À propos
     */
    public function about(): Response
    {
        return Inertia::render('about', [
            'title' => 'À propos - TIMMI'
        ]);
    }

    /**
     * Affiche la page Contact
     */
    public function contact(): Response
    {
        return Inertia::render('contact', [
            'title' => 'Contact - TIMMI'
        ]);
    }

    /**
     * Affiche la page FAQ
     */
    public function faq(): Response
    {
        return Inertia::render('faq', [
            'title' => 'FAQ - TIMMI'
        ]);
    }

    /**
     * Affiche la page Conditions d'utilisation
     */
    public function terms(): Response
    {
        return Inertia::render('terms', [
            'title' => 'Conditions d\'utilisation - TIMMI'
        ]);
    }

    /**
     * Affiche la page Politique de confidentialité
     */
    public function privacy(): Response
    {
        return Inertia::render('privacy', [
            'title' => 'Politique de confidentialité - TIMMI'
        ]);
    }
}