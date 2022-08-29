<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupPermission\StoreGroupPermissionRequest;
use App\Http\Requests\GroupPermission\UpdateGroupPermissionRequest;
use App\Models\GroupPermission;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GroupPermissionController extends Controller
{
    public function index()
    {
        return GroupPermission::with('permissions')->get();
    }

    public function show(GroupPermission $groupPermission)
    {
        return response()->json($groupPermission);
    }

    public function store(StoreGroupPermissionRequest $storeGroupPermissionRequest)
    {
        try {
            $groupPermission = GroupPermission::create($storeGroupPermissionRequest->validated());
            return response()->json([
                'message' => "Group permission created succefully",
                'data' => $groupPermission
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateGroupPermissionRequest $request, GroupPermission $groupPermission)
    {
        try {
            $groupPermission->update($request->validated());

            return response()->json(['message' => 'Grup permission berhasil diubah.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Grup permission gagal diubah. ERROR: ' . $th->getMessage()], 500);
        }
    }

    public function destroy(GroupPermission $groupPermission)
    {
        try {
            $groupPermission->delete();
            return response()->json(['message' => 'Group permission deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
