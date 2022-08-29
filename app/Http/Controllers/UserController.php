<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('search')) {
            $users = User::with('roles')->where('name', 'like', '%' . $request->get('search') . '%')->get();
        } else {
            $users = User::with('roles')->get();
        }

        return response()->json($users);
    }

    public function store(StoreUserRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->syncRoles([$request->role]);

            return response()->json([
                "message" => "User berhasil dibuat"
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "User gagal dibuat. ERROR: " . $th->getMessage()
            ], 500);
        }
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(UpdateUserRequest $updateUserRequest, User $user)
    {
        $user->update($updateUserRequest->validated());
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $user->syncRoles([$request->role]);
        return response()->json([
            'message' => 'Role updated successfully',
            'data' => $user->roles()->first()
        ]);
    }

    public function role(User $user)
    {
        return response()->json([
            'message' => 'Role retrieved successfully',
            'data' => $user->roles()->first()
        ]);
    }
}
