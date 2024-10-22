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
        return $this->belongsTo(User::class, 'user_id');
    }

    /** 
     * Make the comment visible
     * @return void 
     */
    function approve(): void
    {
        $this->is_approved = true;
        $this->save();
    }

    /**
     * Check if the provided User is related to the Comment
     * - if the User is the Comment creator
     * or 
     * - if the User is the Post creator
     * @param User $user the external User
     * @return bool
     */
    function isUserRelatedToComment(User $user): bool
    {
        $post = $this->post()->get()->first();

        return $user->id === $this->user_id || $post->isUserTheAuthor($user);
    }
}
