<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paiement effectué - Timmi</title>
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
            background-color: #7c3aed;
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

        /* Payout Info */
        .payout-info {
            background-color: #f5f3ff;
            border: 1px solid #ddd6fe;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }

        .payout-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e9d5ff;
        }

        .payout-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .payout-label {
            color: #6d28d9;
            font-size: 14px;
        }

        .payout-value {
            font-weight: 600;
            color: #6d28d9;
        }

        /* Button */
        .button {
            display: inline-block;
            background-color: #7c3aed;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
        }

        /* Stats Box */
        .stats-box {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            gap: 10px;
        }

        .stat-item {
            flex: 1;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
        }

        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #7c3aed;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 12px;
            color: #64748b;
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

            .stats-box {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Paiement effectué</h1>
        </div>

        <div class="content">
            <p>Bonjour {{ $teacher->name }},</p>

            <p>Nous avons le plaisir de vous informer que votre paiement a été effectué avec succès.</p>

            <div class="payout-info">
                <div class="payout-row">
                    <span class="payout-label">Numéro de paiement</span>
                    <span class="payout-value">{{ $payout->payout_number }}</span>
                </div>
                <div class="payout-row">
                    <span class="payout-label">Montant</span>
                    <span class="payout-value">{{ number_format($payout->amount, 0, ',', ' ') }} FCFA</span>
                </div>
                <div class="payout-row">
                    <span class="payout-label">Mode de paiement</span>
                    <span class="payout-value">
                        @switch($payout->payment_method)
                            @case('mobile_money')
                                Mobile Money
                                @break
                            @case('bank_transfer')
                                Virement bancaire
                                @break
                            @default
                                {{ $payout->payment_method }}
                        @endswitch
                    </span>
                </div>
                <div class="payout-row">
                    <span class="payout-label">Référence</span>
                    <span class="payout-value">{{ $payout->payment_reference }}</span>
                </div>
                <div class="payout-row">
                    <span class="payout-label">Période</span>
                    <span class="payout-value">
                        {{ \Carbon\Carbon::parse($payout->period_start)->locale('fr')->isoFormat('D MMM') }}
                        -
                        {{ \Carbon\Carbon::parse($payout->period_end)->locale('fr')->isoFormat('D MMM YYYY') }}
                    </span>
                </div>
            </div>

            <div class="stats-box">
                <div class="stat-item">
                    <div class="stat-value">{{ $payout->bookings_count }}</div>
                    <div class="stat-label">Cours donnés</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{{ number_format($payout->amount / $payout->bookings_count, 0, ',', ' ') }}</div>
                    <div class="stat-label">Moyenne par cours</div>
                </div>
            </div>

            <center>
                <a href="{{ route('teacher.earnings') }}" class="button">
                    Voir mes revenus
                </a>
            </center>

            <p>Pour rappel :</p>
            <ul>
                <li>Les paiements sont effectués automatiquement tous les 15 jours</li>
                <li>Le montant inclut tous les cours confirmés sur la période</li>
                <li>Vous pouvez suivre vos revenus en temps réel sur votre espace</li>
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