<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>{{ $title ?? 'Notification' }} - Timmi</title>
    <style>
        /* Reset CSS */
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            background-color: #f3f4f6;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.5;
            color: #1f2937;
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
            background-color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            text-decoration: none;
        }
        
        /* Content */
        .content {
            background-color: #ffffff;
            padding: 32px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        /* Typography */
        h1 {
            color: #111827;
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 24px 0;
        }
        
        p {
            margin: 0 0 16px 0;
            color: #4b5563;
        }
        
        /* Button */
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 24px 0;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 24px 0;
            color: #6b7280;
            font-size: 14px;
        }
        
        .footer p {
            margin: 4px 0;
            color: #6b7280;
        }
        
        /* Utils */
        .text-center {
            text-align: center;
        }
        
        .mt-8 {
            margin-top: 32px;
        }
        
        .text-sm {
            font-size: 14px;
        }
        
        .text-gray {
            color: #6b7280;
        }
        
        /* Status badges */
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .badge-success {
            background-color: #dcfce7;
            color: #16a34a;
        }
        
        .badge-warning {
            background-color: #fef3c7;
            color: #d97706;
        }
        
        .badge-info {
            background-color: #dbeafe;
            color: #2563eb;
        }
        
        /* Data table */
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
        }
        
        .table th,
        .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .table th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #4b5563;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .container {
                padding: 12px;
            }
            
            .content {
                padding: 24px 16px;
            }
            
            h1 {
                font-size: 20px;
            }
            
            .table {
                display: block;
                overflow-x: auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="{{ config('app.url') }}" class="logo">
                Timmi
            </a>
        </div>
        
        <div class="content">
            {{ $slot }}
        </div>
        
        <div class="footer">
            <p>© {{ date('Y') }} Timmi. Tous droits réservés.</p>
            <p class="text-sm">
                Vous recevez cet email car vous êtes membre de la plateforme Timmi.
                Si vous n'êtes pas à l'origine de cette action, veuillez nous contacter.
            </p>
            <p class="text-sm mt-8">
                <a href="#" style="color: #6b7280; text-decoration: underline;">Gérer mes notifications</a>
                •
                <a href="#" style="color: #6b7280; text-decoration: underline;">Se désabonner</a>
            </p>
        </div>
    </div>
</body>
</html> 