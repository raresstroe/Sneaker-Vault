<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Table: vouchers Create
     * id
     * code(string, 16, unique)
     * discount_value(decimal, 5, 2)
     * discount_type(enum, percentage, fixed)
     * valid_until(datetime)
     * is_active(boolean, default true)
     * timestamps
     * 
     * Table: orders Update
     * voucher_id(foreign, nullable, constrained, vouchers)
     * total_discounted_price(integer)
     */
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code', 16)->unique();
            $table->decimal('discount_value', 5, 2);
            $table->enum('discount_type', ['percentage', 'fixed']);
            $table->dateTime('valid_until');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('voucher_id')->nullable()->constrained('vouchers')->after('shipping_address');
            $table->integer('total_discounted_price')->after('total_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['voucher_id']);
            $table->dropColumn('voucher_id');
            $table->dropColumn('total_discounted_price');
        });
    }
};
