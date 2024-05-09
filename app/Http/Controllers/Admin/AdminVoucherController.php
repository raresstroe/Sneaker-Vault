<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Exception;
use Inertia\Inertia;
use Carbon\Carbon;



class AdminVoucherController extends Controller
{
    public function index(Request $request)
    {
        $vouchers = Voucher::all();

        return Inertia::render('Admin/AdminVoucher', [
            'vouchers' => $vouchers
        ]);
    }


    public function add(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'code' => 'required|string',
                'discount_value' => 'required|string',
                'discount_type' => 'required|string',
                'valid_until' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
                'is_active' => 'boolean',
            ]);

            $validUntil = Carbon::createFromFormat('Y-m-d\TH:i:s.v\Z', $request->input('valid_until'));

            Voucher::create([
                'code' => $request->input('code'),
                'discount_value' => $request->input('discount_value'),
                'discount_type' => $request->input('discount_type'),
                'valid_until' => $validUntil,
                'is_active' => $request->input('is_active'),
            ]);

            return redirect()->route('voucher.index')->with('success', 'Voucher added successfully.');
        } catch (\Exception $e) {
            Log::error('Exception occurred while adding voucher: ' . $e->getMessage());
        }
    }


    public function update(Request $request, Voucher $voucher)
    {
        try {
            $validator = Validator::make($request->all(), [
                'code' => 'required|string',
                'discount_value' => 'required|string',
                'discount_type' => 'required|string',
                'valid_until' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
                'is_active' => 'required|boolean',
            ]);

            if ($validator->fails()) {
                Log::error('Validation errors: ' . print_r($validator->errors()->all(), true));
                return redirect()->route('voucher.index')->withErrors($validator->errors());
            }

            $validUntil = Carbon::createFromFormat('Y-m-d\TH:i:s.v\Z', $request->input('valid_until'));

            $voucher->update([
                'code' => $request->input('code'),
                'discount_value' => $request->input('discount_value'),
                'discount_type' => $request->input('discount_type'),
                'valid_until' => $validUntil,
                'is_active' => $request->input('is_active'),
            ]);

            return redirect()->route('voucher.index')->with('success', 'Voucher updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating voucher: ' . $e->getMessage());
            return redirect()->route('voucher.index')->withErrors(['msg' => 'Voucher update failed.']);
        }
    }


    public function destroy(Voucher $voucher)
    {
        try {
            $voucher->delete();

            return redirect()->route('voucher.index')->with('success', 'Voucher deleted successfully.');
        } catch (Exception $e) {
            Log::error('Error deleting voucher: ' . $e->getMessage());

            return redirect()->route('voucher.index')->withErrors(['msg' => 'Voucher deletion failed.']);
        }
    }
}
