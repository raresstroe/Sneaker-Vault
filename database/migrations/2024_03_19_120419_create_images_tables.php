<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Table: user_images
     * varchar (image_path, 256 characters)
     * foreignId (user_id)
     * timestamps
     * 
     * Table: product_images
     * varchar (image_path, 256 characters)
     * foreignId (product_id)
     * timestamps
     * 
     * Table: banner_images
     * varchar (alt, 128 characters)
     * varchar (href, 256 characters)
     * varchar (image_path, 256 characters)
     * boolean (is_active)
     * timestamps
     * 
     * Table: brands_images
     * varchar (alt, 128 characters)
     * varchar (href, 256 characters)
     * varchar (image_path, 256 characters)
     * boolean (is_active)
     * timestamps
     */
    public function up(): void
    {
        Schema::create('user_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('image_path', 256);
            $table->timestamps();
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('image_path', 256);
            $table->timestamps();
        });

        Schema::create('banner_images', function (Blueprint $table) {
            $table->id();
            $table->string('alt', 128);
            $table->string('href', 256);
            $table->string('image_path', 256);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('brands_images', function (Blueprint $table) {
            $table->id();
            $table->string('alt', 128);
            $table->string('href', 256);
            $table->string('image_path', 256);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_images');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('banner_images');
        Schema::dropIfExists('brands_images');
    }
};
