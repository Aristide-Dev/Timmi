<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Configuration des services SMS
    |--------------------------------------------------------------------------
    |
    | Ce fichier contient la configuration pour les différents services SMS
    | que vous pouvez utiliser pour envoyer des codes de vérification.
    |
    */

    'default' => env('SMS_DRIVER', 'log'),

    'drivers' => [
        'twilio' => [
            'sid' => env('TWILIO_SID'),
            'token' => env('TWILIO_TOKEN'),
            'from' => env('TWILIO_FROM'),
        ],

        'vonage' => [
            'key' => env('VONAGE_KEY'),
            'secret' => env('VONAGE_SECRET'),
            'from' => env('VONAGE_FROM'),
        ],

        'log' => [
            'channel' => env('SMS_LOG_CHANNEL', 'daily'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Configuration des codes de vérification
    |--------------------------------------------------------------------------
    |
    | Durée de validité et format des codes de vérification SMS.
    |
    */

    'verification' => [
        'code_length' => 6,
        'expires_in_minutes' => 10,
        'max_attempts' => 3,
        'throttle_minutes' => 1,
    ],
];
