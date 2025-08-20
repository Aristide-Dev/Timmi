<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            ['name' => 'Conakry', 'code' => 'CKY'],
            ['name' => 'Kindia', 'code' => 'KIN'],
            ['name' => 'Télimélé', 'code' => 'TEL'],
            ['name' => 'Dubréka', 'code' => 'DUB'],
            ['name' => 'Coyah', 'code' => 'COY'],
            ['name' => 'Forécariah', 'code' => 'FOR'],
            ['name' => 'Boké', 'code' => 'BOK'],
            ['name' => 'Fria', 'code' => 'FRI'],
            ['name' => 'Boffa', 'code' => 'BOF'],
            ['name' => 'Gaoual', 'code' => 'GAO'],
            ['name' => 'Koundara', 'code' => 'KOU'],
            ['name' => 'Mamou', 'code' => 'MAM'],
            ['name' => 'Pita', 'code' => 'PIT'],
            ['name' => 'Dalaba', 'code' => 'DAL'],
            ['name' => 'Labé', 'code' => 'LAB'],
            ['name' => 'Lélouma', 'code' => 'LEL'],
            ['name' => 'Mali', 'code' => 'MAL'],
            ['name' => 'Tougué', 'code' => 'TOU'],
            ['name' => 'Kankan', 'code' => 'KAN'],
            ['name' => 'Kérouané', 'code' => 'KER'],
            ['name' => 'Kouroussa', 'code' => 'KRS'],
            ['name' => 'Mandiana', 'code' => 'MAN'],
            ['name' => 'Siguiri', 'code' => 'SIG'],
            ['name' => 'Faranah', 'code' => 'FAR'],
            ['name' => 'Kissidougou', 'code' => 'KIS'],
            ['name' => 'Dabola', 'code' => 'DAB'],
            ['name' => 'Dinguiraye', 'code' => 'DIN'],
            ['name' => 'Lola', 'code' => 'LOL'],
            ['name' => 'Macenta', 'code' => 'MAC'],
            ['name' => 'N\'Zérékoré', 'code' => 'NZE'],
            ['name' => 'Guéckédou', 'code' => 'GUE'],
            ['name' => 'Beyla', 'code' => 'BEY'],
            ['name' => 'Yomou', 'code' => 'YOM'],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}
