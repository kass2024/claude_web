<?php

namespace App\Models;

use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'full_description',
        'icon',
        'image_path',
        'sort_order',
        'is_published',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_published' => 'boolean',
    ];
}

