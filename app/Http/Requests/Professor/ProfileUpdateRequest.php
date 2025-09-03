<?php

declare(strict_types=1);

namespace App\Http\Requests\Professor;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Déterminer si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Obtenir les règles de validation qui s'appliquent à la requête.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $this->user()->id],
            'phone' => ['required', 'string', 'max:20', 'unique:users,phone,' . $this->user()->id],
            'bio' => ['required', 'string', 'max:1000'],
            'hourly_rate' => ['required', 'numeric', 'min:0', 'max:999999'],
            'profile_photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'subjects' => ['required', 'array', 'min:1'],
            'subjects.*' => ['exists:subjects,id'],
            'levels' => ['required', 'array', 'min:1'],
            'levels.*' => ['exists:levels,id'],
            'cities' => ['required', 'array', 'min:1'],
            'cities.*' => ['exists:cities,id'],
        ];
    }

    /**
     * Obtenir les messages d'erreur personnalisés pour les règles de validation.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est obligatoire.',
            'name.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être une adresse email valide.',
            'email.unique' => 'Cette adresse email est déjà utilisée.',
            'phone.required' => 'Le numéro de téléphone est obligatoire.',
            'phone.unique' => 'Ce numéro de téléphone est déjà utilisé.',
            'bio.required' => 'La biographie est obligatoire.',
            'bio.max' => 'La biographie ne peut pas dépasser 1000 caractères.',
            'hourly_rate.required' => 'Le tarif horaire est obligatoire.',
            'hourly_rate.numeric' => 'Le tarif horaire doit être un nombre.',
            'hourly_rate.min' => 'Le tarif horaire doit être positif.',
            'profile_photo.image' => 'Le fichier doit être une image.',
            'profile_photo.mimes' => 'L\'image doit être au format JPEG, PNG, JPG ou GIF.',
            'profile_photo.max' => 'L\'image ne peut pas dépasser 2MB.',
            'subjects.required' => 'Vous devez sélectionner au moins une matière.',
            'subjects.min' => 'Vous devez sélectionner au moins une matière.',
            'levels.required' => 'Vous devez sélectionner au moins un niveau.',
            'levels.min' => 'Vous devez sélectionner au moins un niveau.',
            'cities.required' => 'Vous devez sélectionner au moins une ville.',
            'cities.min' => 'Vous devez sélectionner au moins une ville.',
        ];
    }
}
