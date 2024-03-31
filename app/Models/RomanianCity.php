<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RomanianCity extends Model
{
    use HasFactory;

    protected $table = 'romanian_cities';

    protected $fillable = ['id', 'siruta', 'county_code', 'city_name'];
}
