@component('emails.layout', ['title' => 'Compte validé'])
    <h1>Félicitations ! Votre compte professeur est validé 🎉</h1>
    
    <p>Bonjour {{ $teacher->name }},</p>
    
    <p>
        Nous sommes ravis de vous annoncer que votre compte professeur sur Timmi a été validé par notre équipe.
        Vous pouvez dès maintenant commencer à recevoir des réservations de cours particuliers.
    </p>
    
    <div style="background-color: #dcfce7; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <p style="color: #16a34a; margin: 0;">
            <strong>Votre compte est maintenant actif !</strong><br>
            Vous pouvez accéder à toutes les fonctionnalités de la plateforme.
        </p>
    </div>
    
    <p>
        Prochaines étapes recommandées :
    </p>
    
    <ol style="color: #4b5563; padding-left: 20px;">
        <li>Complétez votre profil avec une photo professionnelle</li>
        <li>Définissez vos disponibilités hebdomadaires</li>
        <li>Ajoutez des spécialités à vos matières enseignées</li>
        <li>Personnalisez vos tarifs par matière si nécessaire</li>
    </ol>
    
    <div class="text-center">
        <a href="{{ route('teacher.dashboard') }}" class="button">
            Accéder à mon tableau de bord
        </a>
    </div>
    
    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h2 style="margin: 0 0 12px 0; font-size: 16px; color: #111827;">
            Rappel de vos informations :
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 4px 0; color: #6b7280;">Email :</td>
                <td style="padding: 4px 0; color: #111827;">{{ $teacher->email }}</td>
            </tr>
            <tr>
                <td style="padding: 4px 0; color: #6b7280;">Téléphone :</td>
                <td style="padding: 4px 0; color: #111827;">{{ $teacher->phone }}</td>
            </tr>
            <tr>
                <td style="padding: 4px 0; color: #6b7280;">Ville :</td>
                <td style="padding: 4px 0; color: #111827;">{{ $teacher->city }}</td>
            </tr>
            <tr>
                <td style="padding: 4px 0; color: #6b7280;">Mode d'enseignement :</td>
                <td style="padding: 4px 0; color: #111827;">
                    @if($teacher->teacherProfile->teaching_mode === 'both')
                        Présentiel & En ligne
                    @else
                        {{ $teacher->teacherProfile->teaching_mode === 'presentiel' ? 'Présentiel' : 'En ligne' }}
                    @endif
                </td>
            </tr>
        </table>
    </div>
    
    <p>
        Notre équipe reste à votre disposition pour toute question ou assistance dont vous pourriez avoir besoin.
    </p>
    
    <p class="text-sm text-gray mt-8">
        Bienvenue dans la communauté des professeurs Timmi !
    </p>
@endcomponent 