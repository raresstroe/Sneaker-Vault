<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RomanianCounty extends Model
{
    use HasFactory;

    protected $table = 'romanian_counties';

    protected $fillable = ['id', 'county_code', 'county_name'];
}
