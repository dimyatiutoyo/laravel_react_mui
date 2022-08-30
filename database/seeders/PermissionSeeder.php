<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            [
                'name' => 'view-user',
                'description' => 'view user',
                'display_name' => 'View User',
            ],
            [
                'name' => 'create-user',
                'description' => 'create user',
                'display_name' => 'Create User',
            ],
            [
                'name' => 'edit-user',
                'description' => 'edit user',
                'display_name' => 'Edit User',
            ],
            [
                'name' => 'delete-user',
                'description' => 'delete user',
                'display_name' => 'Delete User',
            ],
            [
                'name' => 'view-permission',
                'description' => 'view permission',
                'display_name' => 'View Permission',
            ],
            [
                'name' => 'create-permission',
                'description' => 'create permission',
                'display_name' => 'Create Permission',
            ],
            [
                'name' => 'edit-permission',
                'description' => 'edit permission',
                'display_name' => 'Edit Permission',
            ],
            [
                'name' => 'delete-permission',
                'description' => 'delete permission',
                'display_name' => 'Delete Permission',
            ],
            [
                'name' => 'manage-role-and-permission',
                'description' => 'Manage Role and Permission',
                'display_name' => 'Manage Role and Permission',
            ],
            [
                'name' => 'view-instansi',
                'description' => 'View Instansi',
                'display_name' => 'View Instansi',
            ],
            [
                'name' => 'edit-instansi',
                'description' => 'Edit Instansi',
                'display_name' => 'Edit Instansi',
            ],
            [
                'name' => 'manage-jenis-laporan',
                'description' => 'Manage Jenis Laporan',
                'display_name' => 'Manage Jenis Laporan',
            ],
        ];

        $permissionsCollection = collect($permissions);
        $permissionsCollection->each(function ($permissions) {
            Permission::updateOrInsert($permissions, ['name' => $permissions['name']]);
        });

        $superadminRole = Role::where('name', 'superadmin')->first();
        $superadminRole->attachPermissions($permissionsCollection->pluck('name'));
    }
}
