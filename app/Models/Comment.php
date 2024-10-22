<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    public $fillable = [
        'content',
        'post_id',
        'user_id',
        'is_approved',
    ];

    function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    function author(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
