<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Team::create(
            [
                'name' => 'lokajaya',
                'display_name' => 'Lokajaya SM',
                'type' => 'lokajaya',
            ]
        );
        Team::create(
            [
                'name' => 'perekonomian',
                'display_name' => 'Perekonomian Kab. Demak',
                'type' => 'perekonomian',
            ]
        );

        Team::create(
            [
                'name' => 'dss',
                'display_name' => 'DSS',
                'type' => 'bumd',
            ]
        );

        Team::create(
            [
                'name' => 'lkm',
                'display_name' => 'LKM',
                'type' => 'bumd',
            ]
        );

        Team::create(
            [
                'name' => 'anwusa',
                'display_name' => 'ANWUSA',
                'type' => 'bumd',
            ]
        );

        Team::create(
            [
                'name' => 'bprbkk',
                'display_name' => 'BPR BKK',
                'type' => 'bumd',
            ]
        );
    }
}
