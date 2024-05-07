<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;




class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function edit(Request $request): Response
    {
        $profile_picture = $request->user()->profile_picture;

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile_picture' => $profile_picture
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Update the user's profile picture.
     */
    public function updatePicture(Request $request): RedirectResponse
    {
        Validator::extend('image_extension', function ($attribute, $value, $parameters, $validator) {
            $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif'];
            if ($value instanceof UploadedFile) {
                $extension = strtolower($value->getClientOriginalExtension());
                return in_array($extension, $allowedExtensions);
            }
            return false;
        });

        $request->validate([
            'picture' => ['image_extension', 'max:10000'],
        ]);
        $user = $request->user();
        // dd(request()->all());
        // dd($user);
        try {
            if ($request->hasFile('picture')) {
                $filename = Str::uuid() . '.' . $request->file('picture')->getClientOriginalExtension();

                $path = $request->file('picture')->storeAs('profile-pictures/' . $user->id, $filename, 'public');

                if ($user->profile_picture) {
                    Storage::disk('public')->delete($user->profile_picture);
                }

                $user->update(['profile_picture' => '/storage/' . $path]);

                return Redirect::route('profile.edit')->with('success', 'Profile picture updated successfully.');
            } else {

                return Redirect::route('profile.edit')->with('error', 'No picture uploaded.');
            }
        } catch (\Exception $e) {
            Log::error('Error updating profile picture: ' . $e->getMessage());
            return Redirect::route('profile.edit')->with('error', 'An error occurred while updating the profile picture.');
        }
    }
}
