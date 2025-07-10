@component('emails.layout', ['title' => 'Paiement reçu'])
    <h1>Paiement reçu avec succès !</h1>
    
    <p>Bonjour {{ $payment->parent->name }},</p>
    
    <p>
        Nous vous confirmons la réception de votre paiement pour la réservation suivante :
    </p>
    
    <div style="background-color: #dcfce7; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <table style="width: 100%;">
            <tr>
                <td style="color: #16a34a;">
                    <strong>Montant payé :</strong>
                </td>
                <td style="text-align: right; color: #16a34a;">
                    <strong>{{ number_format($payment->amount, 0, ',', ' ') }} FCFA</strong>
                </td>
            </tr>
            <tr>
                <td style="color: #16a34a;">
                    Transaction ID :
                </td>
                <td style="text-align: right; color: #16a34a;">
                    {{ $payment->transaction_id }}
                </td>
            </tr>
        </table>
    </div>
    
    <table class="table">
        <tr>
            <th>Réservation</th>
            <td>{{ $payment->booking->booking_number }}</td>
        </tr>
        <tr>
            <th>Matière</th>
            <td>{{ $payment->booking->subject->name }}</td>
        </tr>
        <tr>
            <th>Professeur</th>
            <td>{{ $payment->booking->teacher->name }}</td>
        </tr>
        <tr>
            <th>Élève</th>
            <td>{{ $payment->booking->child->name }}</td>
        </tr>
        <tr>
            <th>Date du cours</th>
            <td>{{ $payment->booking->class_date->format('l j F Y') }}</td>
        </tr>
        <tr>
            <th>Mode de paiement</th>
            <td>
                <span class="badge badge-info">
                    @switch($payment->payment_method)
                        @case('orange_money')
                            Orange Money
                            @break
                        @case('visa')
                            Carte Visa
                            @break
                        @case('paycard')
                            PayCard
                            @break
                        @default
                            {{ $payment->payment_method }}
                    @endswitch
                </span>
            </td>
        </tr>
    </table>
    
    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <p style="margin: 0; color: #4b5563;">
            <strong>Important :</strong><br>
            Le montant sera libéré au professeur 48h après la confirmation que le cours a bien eu lieu.
            En cas de problème, vous pouvez signaler l'absence du professeur dans ce délai.
        </p>
    </div>
    
    <div class="text-center">
        <a href="{{ route('parent.booking.show', $payment->booking->id) }}" class="button">
            Voir les détails de la réservation
        </a>
    </div>
    
    <p class="text-sm text-gray mt-8">
        Une facture détaillée est disponible dans votre espace personnel.
    </p>
@endcomponent 