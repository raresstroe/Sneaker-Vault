<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'content';

    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'type',
    ];
}
