<?php

namespace App\Http\Controllers;

use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Models\GroupPermission;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::get();
        return response()->json($permissions);
    }

    public function store(StorePermissionRequest $request)
    {
        try {
            $permission = Permission::create($request->validated());
            return response()
                ->json(['message' => 'Permission created succesfully.', 'data' => $permission], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return response()
                ->json(['message' => 'Permission created failed. ERROR: ' . $th->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Permission $permission)
    {
        return response()->json($permission);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        try {
            $permission->update($request->validated());
            return response()->json(['message' => 'Permission updated succesfully.', 'data' => $permission], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Permission updated failed.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Permission $permission)
    {
        try {
            $permission->delete();
            return response()->json(['message' => 'Permission deleted successfully'], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Delete failed. ERROR: ' . $th->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
