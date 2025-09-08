<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $user->load('studentSubjects');
        
        $allSubjects = Subject::all();
        
        return Inertia::render('Student/Subjects/Index', [
            'user' => $user,
            'subjects' => $allSubjects,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
        ]);

        $user->studentSubjects()->syncWithoutDetaching([$request->subject_id]);

        return back()->with('success', 'Matière ajoutée avec succès.');
    }

    public function destroy(Request $request, Subject $subject)
    {
        $user = $request->user();
        
        $user->studentSubjects()->detach($subject->id);

        return back()->with('success', 'Matière supprimée avec succès.');
    }
}
