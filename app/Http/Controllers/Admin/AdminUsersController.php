<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Order;

class AdminUsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();

        return Inertia::render('Admin/AdminUsers', ['users' => $users]);
    }

    public function admin(Request $request)
    {
        $userId = $request->input('userId');

        $user = User::findOrFail($userId);

        $user->admin = $user->admin ? 0 : 1;

        $user->save();

        return redirect()->route('users.index')->with('success', 'Admin status updated successfully.');
    }


    public function delete(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
