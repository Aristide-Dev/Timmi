<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    /**
     * Afficher les certificats du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        $certificates = Certificate::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Professor/Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }

    /**
     * Ajouter un nouveau certificat
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'issuing_organization' => 'required|string|max:255',
            'issued_date' => 'required|date|before_or_equal:today',
            'expiry_date' => 'nullable|date|after:issued_date',
            'certificate_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        $user = $request->user();

        // Stocker le fichier si fourni
        $filePath = null;
        if ($request->hasFile('certificate_file')) {
            $filePath = $request->file('certificate_file')->store('certificates', 'public');
        }

        Certificate::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'issuing_organization' => $request->issuing_organization,
            'issued_date' => $request->issued_date,
            'expiry_date' => $request->expiry_date,
            'file_path' => $filePath,
        ]);

        return redirect()->route('professor.certificates.index')
            ->with('success', 'Certificat ajouté avec succès.');
    }

    /**
     * Supprimer un certificat
     */
    public function destroy(Request $request, Certificate $certificate): RedirectResponse
    {
        // Vérifier que le certificat appartient au professeur
        if ($certificate->user_id !== $request->user()->id) {
            abort(403);
        }

        // Supprimer le fichier
        if ($certificate->file_path && Storage::disk('public')->exists($certificate->file_path)) {
            Storage::disk('public')->delete($certificate->file_path);
        }

        $certificate->delete();

        return redirect()->route('professor.certificates.index')
            ->with('success', 'Certificat supprimé avec succès.');
    }
}
