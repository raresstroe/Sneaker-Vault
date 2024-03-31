<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Table: orders
     * id
     * foreignId (user_id)
     * integer (total_price)
     * string (order_status, 256 characters)
     * string (payment_method, 256 characters)
     * string (shipping_address, 256 characters)
     * timestamps
     * 
     * Table: order_items
     * id
     * foreignId (order_id)
     * foreignId (product_id)
     * integer (quantity)
     * integer (price)
     * integer (total_price)
     * timestamps
     */

    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('total_price');
            $table->string('order_status', 256);
            $table->string('payment_method', 256);
            $table->string('shipping_address', 256);
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->integer('quantity');
            $table->integer('price');
            $table->integer('total_price');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};
