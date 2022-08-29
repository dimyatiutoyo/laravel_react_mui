<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\UpdateRolePermissionRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laratrust\LaratrustFacade;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json(Role::with('permissions')->get());
    }

    public function show($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return response()->json($role);
    }

    public function update(Request $request, Role $role)
    {
        try {
            $role->syncPermissions($request->permissions);
            return response()->json(['message' => 'Role updated successfully'], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Update failed. ERROR: ' . $th->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updatePermission(UpdateRolePermissionRequest $request, Role $role)
    {
        try {
            if ($request->checked === true) {
                $role->attachPermission($request->id);
            } else {
                $role->detachPermission($request->id);
            }

            return response()->json(['message' => 'Role Permission updated successfully'], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Update failed. ERROR: ' . $th->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
