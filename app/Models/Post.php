<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    // Fillable Props
    public $fillable = [
        'title',
        'content',
        'user_id'
    ];

    function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
