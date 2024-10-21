<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    public $fillable = [
        'content',
        'post_id',
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
