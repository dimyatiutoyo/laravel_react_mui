<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name' => 'superadmin',
                'display_name' => 'Superadmin',
                'description' => 'Superadmin Role',
                'type' => 'lokajaya'
            ],
            [
                'name' => 'kepala-perekonomian',
                'display_name' => 'Kepala Perekonomian',
                'description' => 'Kepala Perekonomian Role',
                'type' => 'perekonomian'
            ],
            [
                'name' => 'admin',
                'display_name' => 'Admin Perekonomian',
                'description' => 'Admin Perekonomian Role',
                'type' => 'perekonomian'
            ],
            [
                'name' => 'admin-bumd',
                'display_name' => 'Admin BUMD',
                'description' => 'Admin BUMD Role',
                'type' => 'bumd'
            ],
        ];

        collect($roles)->each(function ($role) {
            $role = Role::updateOrInsert($role, ['name' => $role['name']]);
        });
    }
}
