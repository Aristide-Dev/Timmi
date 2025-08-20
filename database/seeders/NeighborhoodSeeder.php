<?php

namespace Database\Seeders;

use App\Models\Commune;
use App\Models\Neighborhood;
use Illuminate\Database\Seeder;

class NeighborhoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // On prend les 5 communes de Conakry
        $communes = Commune::where('city_id', 1)->get();

        $quartiersParCommune = [
            'Ratoma' => [
                ['name' => 'Kipé', 'code' => 'RAT_KIPE'],
                ['name' => 'Taouyah', 'code' => 'RAT_TAO'],
                ['name' => 'Lambanyi', 'code' => 'RAT_LAM'],
                ['name' => 'Nongo', 'code' => 'RAT_NON'],
                ['name' => 'Sonfonia', 'code' => 'RAT_SON'],
            ],
            'Matoto' => [
                ['name' => 'Sangoyah', 'code' => 'MAT_SAN'],
                ['name' => 'Tafory', 'code' => 'MAT_TAF'],
                ['name' => 'Yimbaya', 'code' => 'MAT_YIM'],
                ['name' => 'Gbessia', 'code' => 'MAT_GBE'],
                ['name' => 'Enta', 'code' => 'MAT_ENT'],
            ],
            'Dixinn' => [
                ['name' => 'Bellevue', 'code' => 'DIX_BEL'],
                ['name' => 'Donka', 'code' => 'DIX_DON'],
                ['name' => 'Landréah', 'code' => 'DIX_LAN'],
                ['name' => 'Camarayah', 'code' => 'DIX_CAM'],
                ['name' => 'Coleah', 'code' => 'DIX_COL'],
            ],
            'Kaloum' => [
                ['name' => 'Boulbinet', 'code' => 'KAL_BOU'],
                ['name' => 'Tombo', 'code' => 'KAL_TOM'],
                ['name' => 'Sandervalia', 'code' => 'KAL_SAN'],
                ['name' => 'Coronthie', 'code' => 'KAL_COR'],
                ['name' => 'Fotoba', 'code' => 'KAL_FOT'],
            ],
            'Matam' => [
                ['name' => 'Bonfi', 'code' => 'MAT_BON'],
                ['name' => 'Madina', 'code' => 'MAT_MAD'],
                ['name' => 'Aviation', 'code' => 'MAT_AVI'],
                ['name' => 'Coléah', 'code' => 'MAT_COL'],
                ['name' => 'Boussoura', 'code' => 'MAT_BOU'],
            ],
        ];

        foreach ($communes as $commune) {
            if (isset($quartiersParCommune[$commune->name])) {
                foreach ($quartiersParCommune[$commune->name] as $neighborhood) {
                    Neighborhood::create([
                        'name' => $neighborhood['name'],
                        'code' => $neighborhood['code'],
                        'commune_id' => $commune->id,
                    ]);
                }
            }
        }
    }
}
