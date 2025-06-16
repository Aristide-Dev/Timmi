<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PagesController extends Controller
{
    /**
     * Page des favoris
     */
    public function favorites(): Response
    {
        return Inertia::render('favorites', [
            'title' => 'Mes Favoris'
        ]);
    }

    /**
     * Page À propos
     */
    public function about(): Response
    {
        return Inertia::render('about', [
            'title' => 'À propos de nous'
        ]);
    }

    /**
     * Page Contact
     */
    public function contact(): Response
    {
        return Inertia::render('contact', [
            'title' => 'Nous contacter'
        ]);
    }

    /**
     * Page Articles
     */
    public function articles(): Response
    {
        return Inertia::render('articles', [
            'title' => 'Articles'
        ]);
    }

    /**
     * Page Services
     */
    public function services(): Response
    {
        return Inertia::render('services', [
            'title' => 'Nos Services'
        ]);
    }
} 