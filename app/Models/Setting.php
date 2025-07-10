<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'label',
        'description',
    ];

    /**
     * Obtenir une valeur de paramètre
     */
    public static function get($key, $default = null)
    {
        $setting = self::where('key', $key)->first();

        if (!$setting) {
            return $default;
        }

        return self::castValue($setting->value, $setting->type);
    }

    /**
     * Définir une valeur de paramètre
     */
    public static function set($key, $value)
    {
        $setting = self::where('key', $key)->first();

        if ($setting) {
            $setting->update(['value' => $value]);
        } else {
            self::create([
                'key' => $key,
                'value' => $value,
                'type' => 'string',
                'group' => 'general',
                'label' => ucfirst(str_replace('_', ' ', $key)),
            ]);
        }
    }

    /**
     * Obtenir tous les paramètres d'un groupe
     */
    public static function getGroup($group)
    {
        return self::where('group', $group)
            ->get()
            ->mapWithKeys(function ($setting) {
                return [$setting->key => self::castValue($setting->value, $setting->type)];
            });
    }

    /**
     * Convertir la valeur selon son type
     */
    protected static function castValue($value, $type)
    {
        switch ($type) {
            case 'integer':
                return (int) $value;
            case 'boolean':
                return filter_var($value, FILTER_VALIDATE_BOOLEAN);
            case 'json':
                return json_decode($value, true);
            case 'float':
            case 'decimal':
                return (float) $value;
            default:
                return $value;
        }
    }

    /**
     * Scope par groupe
     */
    public function scopeByGroup($query, $group)
    {
        return $query->where('group', $group);
    }

    /**
     * Initialiser les paramètres par défaut
     */
    public static function initializeDefaults()
    {
        $defaults = [
            // Commission
            [
                'key' => 'commission_rate',
                'value' => '20',
                'type' => 'decimal',
                'group' => 'commission',
                'label' => 'Taux de commission (%)',
                'description' => 'Pourcentage prélevé sur chaque réservation',
            ],
            // Paiement
            [
                'key' => 'payment_delay_hours',
                'value' => '48',
                'type' => 'integer',
                'group' => 'payment',
                'label' => 'Délai de paiement (heures)',
                'description' => 'Nombre d\'heures avant de libérer le paiement au professeur',
            ],
            // Email
            [
                'key' => 'admin_email',
                'value' => 'admin@timmi.gn',
                'type' => 'string',
                'group' => 'email',
                'label' => 'Email administrateur',
                'description' => 'Email principal de l\'administrateur',
            ],
            // Général
            [
                'key' => 'site_name',
                'value' => 'Timmi',
                'type' => 'string',
                'group' => 'general',
                'label' => 'Nom du site',
                'description' => 'Nom affiché sur la plateforme',
            ],
            [
                'key' => 'maintenance_mode',
                'value' => 'false',
                'type' => 'boolean',
                'group' => 'general',
                'label' => 'Mode maintenance',
                'description' => 'Activer/désactiver le mode maintenance',
            ],
        ];

        foreach ($defaults as $default) {
            self::firstOrCreate(
                ['key' => $default['key']],
                $default
            );
        }
    }
}
