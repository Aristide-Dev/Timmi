<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Availability;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    /**
     * Afficher l'agenda du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Récupérer les disponibilités du professeur
        $availabilities = Availability::where('user_id', $user->id)
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        // Grouper par jour de la semaine
        $schedule = $availabilities->groupBy('day_of_week');

        return Inertia::render('Professor/Schedule/Index', [
            'availabilities' => $availabilities,
        ]);
    }

    /**
     * Créer une nouvelle disponibilité
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'day_of_week' => 'required|integer|between:1,7',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_online' => 'boolean',
        ]);

        $user = $request->user();

        // Vérifier qu'il n'y a pas de conflit avec une disponibilité existante
        $conflict = Availability::where('user_id', $user->id)
            ->where('day_of_week', $request->day_of_week)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                      ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                      ->orWhere(function ($q) use ($request) {
                          $q->where('start_time', '<=', $request->start_time)
                            ->where('end_time', '>=', $request->end_time);
                      });
            })
            ->exists();

        if ($conflict) {
            return redirect()->route('professor.schedule.index')
                ->with('error', 'Cette plage horaire entre en conflit avec une disponibilité existante.');
        }

        Availability::create([
            'user_id' => $user->id,
            'day_of_week' => $request->day_of_week,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_online' => $request->boolean('is_online', false),
        ]);

        return redirect()->route('professor.schedule.index')
            ->with('success', 'Disponibilité ajoutée avec succès.');
    }

    /**
     * Mettre à jour une disponibilité
     */
    public function update(Request $request, Availability $availability): RedirectResponse
    {
        // Vérifier que la disponibilité appartient au professeur
        if ($availability->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'day_of_week' => 'required|integer|between:1,7',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_online' => 'boolean',
        ]);

        // Vérifier qu'il n'y a pas de conflit avec une autre disponibilité
        $conflict = Availability::where('user_id', $request->user()->id)
            ->where('id', '!=', $availability->id)
            ->where('day_of_week', $request->day_of_week)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                      ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                      ->orWhere(function ($q) use ($request) {
                          $q->where('start_time', '<=', $request->start_time)
                            ->where('end_time', '>=', $request->end_time);
                      });
            })
            ->exists();

        if ($conflict) {
            return redirect()->route('professor.schedule.index')
                ->with('error', 'Cette plage horaire entre en conflit avec une disponibilité existante.');
        }

        $availability->update([
            'day_of_week' => $request->day_of_week,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_online' => $request->boolean('is_online', false),
        ]);

        return redirect()->route('professor.schedule.index')
            ->with('success', 'Disponibilité mise à jour avec succès.');
    }

    /**
     * Supprimer une disponibilité
     */
    public function destroy(Request $request, Availability $availability): RedirectResponse
    {
        // Vérifier que la disponibilité appartient au professeur
        if ($availability->user_id !== $request->user()->id) {
            abort(403);
        }

        $availability->delete();

        return redirect()->route('professor.schedule.index')
            ->with('success', 'Disponibilité supprimée avec succès.');
    }
}
