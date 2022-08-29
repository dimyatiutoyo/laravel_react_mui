<?php

use App\Models\GroupPermission;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::view('/{path?}', 'app')->where('path', '.*');

Route::get('/', function () {
    $groups = Role::with('permissions')->find(1);
    return response()->json($groups);
});
