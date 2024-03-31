<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ProductImage;
use App\Models\TemporaryFile;



class AdminProductsController extends Controller
{
    public function index(Request $request)
    {
        $brands = Brand::all();
        $categories = Category::all();


        $filter = $request->query('filter');
        $request->session()->put('filter', $filter);

        $products = Product::query();

        switch ($filter) {
            case 'sale':
                $products->where('is_sale', true);
                break;
            case 'mystery':
                $products->where('category', "4");
                break;
            case 'bestseller':
                $products->where('is_bestseller', true);
                break;
            case 'active':
                $products->where('is_active', true);
                break;
            case 'not-active':
                $products->where('is_active', false);
                break;
            default:
        }

        $products = $products->orderBy('id', 'desc')->get();
        $filter_text = match ($filter) {
            'sale' => 'Produse la reducere',
            'mystery' => 'Mystery Vaults',
            'bestseller' => 'Cele mai vandute produse',
            'active' => 'Produse active',
            'not-active' => 'Produse inactive',
            default => 'Toate produsele',
        };

        return Inertia::render('Admin/AdminProducts', [
            'filter_text' => $filter_text,
            'products' => $products,
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function add(Request $request)
    {
        try {
            $file = $request->file('img_src');
            Validator::extend('image_extension', function ($attribute, $value, $parameters, $validator) {
                $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif'];
                $extension = strtolower($value->getClientOriginalExtension());
                return in_array($extension, $allowedExtensions);
            });

            $validator = Validator::make($request->all(), [
                'title' => 'required|max:128',
                'brand' => 'nullable|max:256',
                'size' => 'nullable|max:256',
                'label' => 'required|max:36',
                'price' => 'required|max:10',
                'img_src' => 'required|image_extension|max:10000',
                'category' => 'required|max:128',
                'type' => 'nullable|max:128',
                'short_description' => '',
                'long_description' => '',
                'is_sale' => 'required|boolean',
                'is_bestseller' => 'required|boolean',
                'is_active' => 'required|boolean',
            ]);

            $temporaryImages = TemporaryFile::all();
            if ($validator->fails()) {
                foreach ($temporaryImages as $tmp_image) {
                    Storage::deleteDirectory('public/products/tmp/' . $tmp_image->folder);
                    $tmp_image->delete();
                }
                return redirect()->route('products.index')->withErrors($validator->errors());
            }

            $validatedData = $validator->validated();

            $linkNameBase = strtolower(str_replace(' ', '-', $validatedData['title']));
            $linkName = $linkNameBase;
            $suffix = 1;

            while (Product::where('link_name', $linkName)->exists()) {
                $linkName = $linkNameBase . '-' . $suffix++;
            }

            $validatedData['link_name'] = $linkName;
            $validatedData['href'] = "/products/product/{$linkName}";

            $product = Product::create($validatedData);

            foreach ($temporaryImages as $tmp_image) {
                Storage::copy('public/products/tmp/' . $tmp_image->folder . '/' . $tmp_image->file, 'public/images/products/' . $product->id . '/' . $tmp_image->file);
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'images/products/' . $product->id . '/' . $tmp_image->file,
                ]);
                Storage::deleteDirectory('public/products/tmp/' . $tmp_image->folder);
                $tmp_image->delete();
            }

            if ($request->hasFile('img_src')) {
                $file = $request->file('img_src');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs("images/products/{$product->id}", $filename, 'public');
                $product->img_src = $path;
                $product->save();
            }
            $filter = $request->session()->get('filter');
            if ($filter) {
                return redirect()->route('products.index', ['filter' => $filter])->with('success', 'Bannerul a fost creat cu succes.');
            }
            return redirect()->route('products.index')->with('success', 'Produsul a fost creat cu succes.');
        } catch (Exception $e) {
            Log::error('Error creating product: ' . $e->getMessage());

            return redirect()->route('products.index')->withErrors(['msg' => 'Produsul nu a putut fi creat.']);
        }
    }


    public function update(Request $request, Product $product)
    {
        try {
            Validator::extend('image_extension', function ($attribute, $value, $parameters, $validator) {
                $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif'];
                if ($value instanceof UploadedFile) {
                    $extension = strtolower($value->getClientOriginalExtension());
                    return in_array($extension, $allowedExtensions);
                }
                return false;
            });

            $validator = Validator::make($request->all(), [
                'title' => 'required|max:128',
                'brand' => 'nullable|max:256',
                'size' => 'nullable|max:256',
                'label' => 'required|max:36',
                'price' => 'required|max:10',
                'category' => 'required|max:128',
                'type' => 'nullable|max:128',
                'href' => 'nullable|max:256',
                'short_description' => '',
                'long_description' => '',
                'is_sale' => 'boolean',
                'is_bestseller' => 'boolean',
                'is_active' => 'boolean',
            ]);

            if ($request->hasFile('img_src')) {
                $validator->addRules(['img_src' => 'image_extension|max:10000']);
            } else {
                $validator->addRules(['img_src' => 'nullable']);
            }
            $validatedData = $validator->validate();

            if ($request->hasFile('img_src')) {
                if (Storage::disk('public')->exists($product->img_src)) {
                    if (Storage::disk('public')->delete($product->img_src)) {
                        $file = $request->file('img_src');
                        $filename = time() . '.' . $file->getClientOriginalExtension();
                        $path = $file->storeAs("images/products/{$product->id}", $filename, 'public');
                        $validatedData['img_src'] = $path;
                    } else {
                        Log::error('Error deleting product image: ' . $product->img_src);
                    }
                }
            }

            $linkName = strtolower(str_replace(' ', '-', $validatedData['title'])) . '-' . $product->id;
            $validatedData['link_name'] = $linkName;

            $validatedData['href'] = "/products/product/{$linkName}";

            $product->update($validatedData);
            $filter = $request->session()->get('filter');
            if ($filter) {
                return redirect()->route('products.index', ['filter' => $filter])->with('success', 'Bannerul a fost creat cu succes.');
            }
            return redirect()->route('products.index')->with('success', 'Product updated successfully.');
        } catch (ValidationException $e) {
            Log::error('Validation errors: ' . print_r($e->errors(), true));

            return redirect()->route('products.index')->withErrors($e->errors());
        } catch (Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());

            return redirect()->route('products.index')->withErrors(['msg' => 'Product update failed.']);
        }
    }

    public function destroy(Product $product, ProductImage $productImage, Request $request)
    {
        try {
            ProductImage::where('product_id', $product->id)->delete();

            Storage::disk('public')->deleteDirectory("images/products/{$product->id}");

            $product->delete();
            $filter = $request->session()->get('filter');
            if ($filter) {
                return redirect()->route('banners.index', ['filter' => $filter])->with('success', 'Bannerul a fost creat cu succes.');
            }
            return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
        } catch (Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());

            return redirect()->route('products.index')->withErrors(['msg' => 'Product deletion failed.']);
        }
    }

    /*File Pond */
    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalExtension = $image->getClientOriginalExtension();
            $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif'];
            if (!in_array($originalExtension, $allowedExtensions)) {
                return '';
            }
            $newFileName = uniqid(true) . '.' . $originalExtension;
            $folder = uniqid('image-', true);
            $image->storeAs('products/tmp/' . $folder, $newFileName, 'public');

            TemporaryFile::create([
                'folder' => $folder,
                'file' => $newFileName,
            ]);

            return $folder;
        }

        return '';
    }
    public function delete(Request $request)
    {
        $tmp_file = TemporaryFile::where('folder', $request->getContent())->first();
        if ($tmp_file) {
            Storage::deleteDirectory('public/products/tmp/' . $tmp_file->folder);
            $tmp_file->delete();
        }

        return response()->noContent();
    }

    public function load($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $images = ProductImage::where('product_id', $id)->get();
        // Log::info('Product images: ' . print_r($images, true));
        return response()->json(['product' => $product, 'images' => $images]);
    }
    public function remove($id, $name)
    {
        $img = ProductImage::where('product_id', $id)->where('image_path', 'images/products/' . $id . '/' . $name)->first();
        if ($img) {
            Storage::delete('public/' . $img->image_path);
            $img->delete();
        }
        return '';
    }


    //Removing all temporary files and folders from the server before new upload 
    public function restore()
    {
        $tmp_files = TemporaryFile::all();

        foreach ($tmp_files as $tmp_file) {
            Storage::deleteDirectory('public/products/tmp/' . $tmp_file->folder);
            $tmp_file->delete();
        }
        return '';
    }
}
