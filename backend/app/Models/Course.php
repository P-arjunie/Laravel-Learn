<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title', 
        'description', 
        'price', 
        'duration', 
        'instructor', 
        'rating', 
        'image_url' // To store the Firebase image URL
    ];
}

