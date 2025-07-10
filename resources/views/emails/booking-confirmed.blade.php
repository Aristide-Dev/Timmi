@component('emails.layout', ['title' => 'Réservation confirmée'])
    <h1>Votre réservation est confirmée !</h1>
    
    <p>Bonjour {{ $booking->parent->name }},</p>
    
    <p>
        Votre réservation de cours particulier a été confirmée. Voici les détails :
    </p>
    
    <table class="table">
        <tr>
            <th>Numéro de réservation</th>
            <td>{{ $booking->booking_number }}</td>
        </tr>
        <tr>
            <th>Matière</th>
            <td>{{ $booking->subject->name }}</td>
        </tr>
        <tr>
            <th>Professeur</th>
            <td>{{ $booking->teacher->name }}</td>
        </tr>
        <tr>
            <th>Élève</th>
            <td>{{ $booking->child->name }}</td>
        </tr>
        <tr>
            <th>Date</th>
            <td>{{ $booking->class_date->format('l j F Y') }}</td>
        </tr>
        <tr>
            <th>Horaire</th>
            <td>{{ $booking->start_time }} - {{ $booking->end_time }}</td>
        </tr>
        <tr>
            <th>Mode</th>
            <td>
                @if($booking->teaching_mode === 'presentiel')
                    <span class="badge badge-info">Présentiel</span>
                    @if($booking->location)
                        <br>
                        <span class="text-sm text-gray">📍 {{ $booking->location }}</span>
                    @endif
                @else
                    <span class="badge badge-info">En ligne</span>
                    @if($booking->online_link)
                        <br>
                        <span class="text-sm text-gray">🔗 Lien visio fourni avant le cours</span>
                    @endif
                @endif
            </td>
        </tr>
        <tr>
            <th>Montant</th>
            <td>{{ number_format($booking->amount, 0, ',', ' ') }} FCFA</td>
        </tr>
    </table>
    
    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
        <p style="margin: 0; color: #4b5563;">
            <strong>Contact du professeur :</strong><br>
            {{ $booking->teacher->name }}<br>
            📞 {{ $booking->teacher->phone }}<br>
            ✉️ {{ $booking->teacher->email }}
        </p>
    </div>
    
    <p>
        Rappel important :
    </p>
    <ul style="color: #4b5563; padding-left: 20px;">
        <li>Le professeur confirmera le cours une fois terminé</li>
        <li>Vous aurez 48h pour confirmer que le cours a bien eu lieu</li>
        <li>Le paiement sera libéré au professeur après votre confirmation</li>
    </ul>
    
    <div class="text-center">
        <a href="{{ route('parent.booking.show', $booking->id) }}" class="button">
            Voir les détails de la réservation
        </a>
    </div>
    
    <p class="text-sm text-gray mt-8">
        Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter.
    </p>
@endcomponent 