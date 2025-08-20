<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Commune;
use Illuminate\Database\Seeder;

class CommuneSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Conakry (code 'CKY')
        $conakry = City::where('code', 'CKY')->first();
        if ($conakry) {
            $communesUrbainesConakry = [
                'Kaloum', 'Dixinn', 'Matam', 'Matoto', 'Ratoma',
                'Gbessia', 'Tombolia', 'Lambanyi', 'Sonfonia',
                'Kagbélén', 'Sanoyah', 'Manéah'
            ];
            foreach ($communesUrbainesConakry as $index => $name) {
                Commune::create([
                    'name'    => $name,
                    'code'    => 'CKY_' . str_pad($index + 1, 2, '0', STR_PAD_LEFT),
                    'city_id' => $conakry->id,
                ]);
            }
        }

        // 2. Villes hors Conakry
        $villesUrbaines = [
            'Kindia', 'Télimélé', 'Dubréka', 'Coyah', 'Forécariah',
            'Boké', 'Fria', 'Boffa', 'Gaoual', 'Koundara',
            'Mamou', 'Pita', 'Dalaba', 'Labé', 'Lélouma',
            'Mali', 'Tougué', 'Kankan', 'Kérouané', 'Kouroussa',
            'Mandiana', 'Siguiri', 'Faranah', 'Kissidougou',
            'Dabola', 'Dinguiraye', 'Lola', 'Macenta', 'N\'Zérékoré',
            'Guéckédou', 'Beyla', 'Yomou'
        ];
        
        foreach ($villesUrbaines as $index => $ville) {
            $city = City::where('name', $ville)->first();
            if ($city) {
                Commune::create([
                    'name'    => $ville,
                    'code'    => $city->code . '_' . str_pad($index + 1, 2, '0', STR_PAD_LEFT),
                    'city_id' => $city->id,
                ]);
            }
        }
    }
}
