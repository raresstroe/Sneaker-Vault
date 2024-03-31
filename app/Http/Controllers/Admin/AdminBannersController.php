<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class AdminBannersController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->query('filter');
        $banners = Banner::query();
        $request->session()->put('filter', $filter);

        switch ($filter) {
            case 'active':
                $banners->where('is_active', true);
                break;
            case 'not-active':
                $banners->where('is_active', false);
                break;
            default:
        }

        $banners = $banners->orderBy('id', 'desc')->get();
        $filter_text = match ($filter) {
            'active' => 'Bannere active',
            'not-active' => 'Bannere inactive',
            default => 'Toate Bannerele',
        };

        return Inertia::render('Admin/AdminBanners', [
            'filter_text' => $filter_text,
            'banners' => $banners,
        ]);
    }

    public function add(Request $request)
    {
        try {
            $file = $request->file('image_path');
            Validator::extend('image_extension', function ($attribute, $value, $parameters, $validator) {
                $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif'];
                $extension = strtolower($value->getClientOriginalExtension());
                return in_array($extension, $allowedExtensions);
            });

            $validator = Validator::make($request->all(), [
                'image_path' => 'required|image_extension|max:10000',
                'alt' => 'nullable|string',
                'href' => 'nullable|string',
                'is_active' => 'required|boolean',
            ]);

            $validatedData = $validator->validated();

            $banner = Banner::create($validatedData);

            if ($request->hasFile('image_path')) {
                $file = $request->file('image_path');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs("images/banners/{$banner->id}", $filename, 'public');
                $banner->image_path = $path;
                $banner->save();
            }
            $filter = $request->session()->get('filter');
            if ($filter) {
                return redirect()->route('banners.index', ['filter' => $filter])->with('success', 'Bannerul a fost creat cu succes.');
            }
            return redirect()->route('banners.index')->with('success', 'Bannerul a fost creat cu succes.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'A aparut o eroare la adaugarea banner-ului');
        }
    }

    public function update(Request $request, Banner $banner)
    {
        try {
            Validator::extend('image_extension', function ($attribute, $value, $parameters, $validator) {
                $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif'];
                $extension = strtolower($value->getClientOriginalExtension());
                return in_array($extension, $allowedExtensions);
            });
            $validator = Validator::make($request->all(), [
                'alt' => 'nullable|string',
                'href' => 'nullable|string',
                'is_active' => 'required|boolean',
            ]);

            if ($request->hasFile('image_path')) {
                $validator->addRules(['image_path' => 'image_extension|max:10000']);
            } else {
                $validator->addRules(['image_path' => 'nullable']);
            }

            $validatedData = $validator->validate();

            if ($request->hasFile('image_path')) {
                if (Storage::disk('public')->exists($banner->image_path)) {
                    if (Storage::disk('public')->delete($banner->image_path)) {
                        $file = $request->file('image_path');
                        $filename = time() . '.' . $file->getClientOriginalExtension();
                        $path = $file->storeAs("images/banners/{$banner->id}", $filename, 'public');
                        $validatedData['image_path'] = $path;
                    } else {
                        Log::error('Error deleting banners image: ' . $banner->image_path);
                    }
                }
            }
            $banner->update($validatedData);
            $filter = $request->session()->get('filter');
            if ($filter) {
                return redirect()->route('banners.index', ['filter' => $filter])->with('success', 'Banner updated successfully.');
            }
            return redirect()->route('banners.index')->with('success', 'Banner updated successfully.');
        } catch (ValidationException $e) {
            Log::error('Validation errors: ' . print_r($e->errors(), true));

            return redirect()->route('banners.index')->withErrors($e->errors());
        } catch (Exception $e) {
            Log::error('Error updating banner: ' . $e->getMessage());

            return redirect()->route('banners.index')->withErrors(['msg' => 'Banner update failed.']);
        }
    }

    public function destroy(Banner $banner, Request $request)
    {
        try {
            Banner::where('id', $banner->id)->delete();

            Storage::disk('public')->deleteDirectory("images/banners/{$banner->id}");

            $banner->delete();
            $filter = $request->session()->get('filter');
            if ($filter) {
                return redirect()->route('banners.index', ['filter' => $filter])->with('success', 'Bannerul a fost creat cu succes.');
            }
            return redirect()->route('banners.index')->with('success', 'Banner deleted successfully.');
        } catch (Exception $e) {
            Log::error('Error deleting banner: ' . $e->getMessage());

            return redirect()->route('banners.index')->withErrors(['msg' => 'Banner deletion failed.']);
        }
    }
}
