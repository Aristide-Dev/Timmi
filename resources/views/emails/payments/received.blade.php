<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paiement reçu - Timmi</title>
    <style>
        /* Reset CSS */
        body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            color: #1a202c;
            background-color: #f7fafc;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header */
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #0891b2;
            border-radius: 8px 8px 0 0;
        }

        .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
        }

        /* Content */
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Payment Info */
        .payment-info {
            background-color: #f0fdfa;
            border: 1px solid #99f6e4;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }

        .payment-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ccfbf1;
        }

        .payment-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .payment-label {
            color: #0f766e;
            font-size: 14px;
        }

        .payment-value {
            font-weight: 600;
            color: #0f766e;
        }

        /* Button */
        .button {
            display: inline-block;
            background-color: #0891b2;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
        }

        /* Footer */
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Paiement reçu</h1>
        </div>

        <div class="content">
            <p>Bonjour {{ $parent->name }},</p>

            <p>Nous avons bien reçu votre paiement pour la réservation suivante :</p>

            <div class="payment-info">
                <div class="payment-row">
                    <span class="payment-label">Transaction</span>
                    <span class="payment-value">{{ $payment->transaction_id }}</span>
                </div>
                <div class="payment-row">
                    <span class="payment-label">Montant</span>
                    <span class="payment-value">{{ number_format($payment->amount, 0, ',', ' ') }} FCFA</span>
                </div>
                <div class="payment-row">
                    <span class="payment-label">Mode de paiement</span>
                    <span class="payment-value">
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
                </div>
                <div class="payment-row">
                    <span class="payment-label">Date</span>
                    <span class="payment-value">{{ \Carbon\Carbon::parse($payment->paid_at)->locale('fr')->isoFormat('D MMMM YYYY à HH:mm') }}</span>
                </div>
            </div>

            <p>Détails de la réservation :</p>
            <ul>
                <li>Professeur : {{ $booking->teacher->name }}</li>
                <li>Matière : {{ $booking->subject->name }}</li>
                <li>Date : {{ \Carbon\Carbon::parse($booking->class_date)->locale('fr')->isoFormat('dddd D MMMM YYYY') }}</li>
                <li>Horaire : {{ $booking->start_time }} - {{ $booking->end_time }}</li>
            </ul>

            <center>
                <a href="{{ route('parent.booking.show', $booking->id) }}" class="button">
                    Voir ma réservation
                </a>
            </center>

            <p>Pour rappel :</p>
            <ul>
                <li>Le paiement est sécurisé et garanti</li>
                <li>Le professeur sera payé après confirmation du cours</li>
                <li>En cas d'annulation, vous serez remboursé selon nos conditions</li>
            </ul>

            <div class="footer">
                <p>
                    Cet email a été envoyé par Timmi<br>
                    Pour toute question, contactez-nous à support@timmi.com
                </p>
            </div>
        </div>
    </div>
</body>
</html> 