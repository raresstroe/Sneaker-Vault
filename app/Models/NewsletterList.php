<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterList extends Model
{
    use HasFactory;

    protected $fillable = ['email'];

    protected $table = 'newsletter';
}
