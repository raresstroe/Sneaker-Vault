<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $table = 'banner_images';
    protected $fillable = [
        'alt',
        'href',
        'image_path',
        'is_active',
    ];
}
