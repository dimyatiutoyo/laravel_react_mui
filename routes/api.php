<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\GroupPermissionController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/auth/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user/permissions', function (Request $request) {
        return Auth::user()->allPermissions()->pluck('name');
    });

    Route::get('/menu/group', function (Request $request) {
        $groups = Permission::get()->pluck('group')->unique()->values();
        return response()->json($groups);
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('user/{user}/role', 'role');
        Route::put('user/{user}/role', 'updateRole')->middleware(["permission:edit-user"]);
        Route::get('user', 'index');
        Route::get('user/{user}', 'show');
        Route::post('user', 'store');
        Route::put('user/{user}', 'update')->middleware(["permission:edit-user"]);
    });

    Route::controller(PermissionController::class)->group(function () {
        Route::get('permission', 'index');
        Route::post('permission', 'store')->middleware(['permission:create-permission']);
        Route::get('permission/{permission}', 'show');
        Route::put('permission/{permission}', 'update')->middleware(['permission:edit-permission']);
        Route::delete('permission/{permission}', 'destroy')->middleware(['permission:delete-permission']);
    });

    Route::controller(RoleController::class)->group(function () {
        Route::get('role', 'index');
        Route::post('role', 'store');
        Route::get('role/{role}', 'show');
        Route::put('role/{role}', 'update');
        Route::put('role/{role}/permission', 'updatePermission');
        Route::delete('role/{role}', 'destroy');
    });

    Route::controller(GroupPermissionController::class)->group(function () {
        Route::get('group-permission', 'index');
        Route::post('group-permission', 'store')->middleware(['permission:create-group-permission']);
        Route::get('group-permission/{groupPermission}', 'show');
        Route::put('group-permission/{groupPermission}', 'update');
        Route::delete('group-permission/{groupPermission}', 'destroy');
    });
});
