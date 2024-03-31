<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * varchar (title, 128 characters)
     * varchar (brand, 256 characters)
     * varchar (size, 256 characters)
     * varchar (label, 36 characters)
     * varchar (price, 10 characters)
     * varchar (img_src, 256 characters)
     * varchar (category, 128 characters)
     * type (varchar, 128 characters)
     * type (href, 256 characters)
     * text (short_description)
     * text (long_description)
     * text (brand_text)
     * boolean (is_sale)
     * boolean (is_bestseller)
     * varchar (availability, 128 characters)
     * timestamps
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title', 128);
            $table->string('brand', 256);
            $table->string('size', 256);
            $table->string('label', 36);
            $table->string('price', 10);
            $table->string('img_src', 256);
            $table->string('category', 128);
            $table->string('type', 128)->nullable(true);
            $table->string('href', 256)->nullable(true);
            $table->text('short_description');
            $table->text('long_description');
            $table->text('brand_text');
            $table->boolean('is_sale')->default(false);
            $table->boolean('is_bestseller')->default(false);
            $table->string('availability', 128)->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
