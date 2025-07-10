@component('mail::message')
# Réservation confirmée

Bonjour {{ $parentName }},

Votre réservation de cours a été confirmée avec succès. Voici les détails :

**Informations du cours**
- Professeur : {{ $teacherName }}
- Élève : {{ $childName }}
- Matière : {{ $subjectName }}
- Date : {{ $date }}
- Horaire : {{ $startTime }} - {{ $endTime }} ({{ $duration }} minutes)
- Mode : {{ $teachingMode === 'presentiel' ? 'Présentiel' : 'En ligne' }}

@if($teachingMode === 'presentiel')
**Lieu du cours**
{{ $location }}
@else
**Lien pour le cours en ligne**
{{ $onlineLink }}
@endif

**Montant payé**
{{ number_format($amount, 0, ',', ' ') }} GNF

@component('mail::button', ['url' => route('parent.booking.show', $booking->id)])
Voir les détails de la réservation
@endcomponent

Pour toute question ou modification, n'hésitez pas à nous contacter.

Merci de votre confiance,<br>
L'équipe {{ config('app.name') }}

@component('mail::subcopy')
Si vous avez des questions, contactez-nous à support@timmi.com
@endcomponent
@endcomponent 