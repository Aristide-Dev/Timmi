<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compte validé - Timmi</title>
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
            background-color: #16a34a;
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

        /* Steps */
        .steps {
            margin: 30px 0;
            padding: 0;
            list-style: none;
        }

        .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e2e8f0;
        }

        .step:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        .step-number {
            width: 30px;
            height: 30px;
            background-color: #16a34a;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }

        .step-content {
            flex: 1;
        }

        .step-title {
            font-weight: 600;
            margin-bottom: 5px;
        }

        .step-description {
            color: #64748b;
            font-size: 14px;
        }

        /* Button */
        .button {
            display: inline-block;
            background-color: #16a34a;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
        }

        /* Info Box */
        .info-box {
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            padding: 20px;
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
            <h1>Félicitations ! Votre compte est validé</h1>
        </div>

        <div class="content">
            <p>Bonjour {{ $teacher->name }},</p>

            <p>Nous sommes ravis de vous annoncer que votre compte professeur sur Timmi a été validé par notre équipe. Vous pouvez dès maintenant commencer à recevoir des réservations de cours particuliers.</p>

            <div class="info-box">
                <p style="margin-top: 0;">✨ <strong>Votre profil est maintenant visible</strong> par les parents d'élèves sur notre plateforme.</p>
            </div>

            <h2>Prochaines étapes</h2>

            <ul class="steps">
                <li class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">Complétez vos disponibilités</div>
                        <div class="step-description">
                            Indiquez vos créneaux horaires pour recevoir des réservations qui correspondent à votre emploi du temps.
                        </div>
                    </div>
                </li>
                <li class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">Personnalisez vos tarifs</div>
                        <div class="step-description">
                            Ajustez vos tarifs par matière et définissez vos spécialités pour chaque matière enseignée.
                        </div>
                    </div>
                </li>
                <li class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <div class="step-title">Recevez des réservations</div>
                        <div class="step-description">
                            Les parents peuvent maintenant vous contacter et réserver des cours avec vous.
                        </div>
                    </div>
                </li>
            </ul>

            <center>
                <a href="{{ route('teacher.dashboard') }}" class="button">
                    Accéder à mon espace professeur
                </a>
            </center>

            <p>Quelques rappels importants :</p>
            <ul>
                <li>Gardez votre profil à jour pour maximiser vos chances d'être contacté</li>
                <li>Répondez rapidement aux demandes de réservation</li>
                <li>Confirmez vos cours une fois terminés</li>
                <li>Les paiements sont sécurisés et automatiques</li>
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