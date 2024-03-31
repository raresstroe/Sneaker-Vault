<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'brand',
        'size',
        'label',
        'short_description',
        'price',
        'long_description',
        'img_src',
        'category',
        'type',
        'href',
        'is_sale',
        'is_bestseller',
        'is_active',
        'link_name'
    ];
}
