<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveCommentRequest;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Create a comment
     * @param Post $post the post 
     * @param SaveCommentRequest $request the incomming request
     * @return JsonResponse the response of the operation
     */
    function create(Post $post, SaveCommentRequest $request): JsonResponse
    {
        $comment = new Comment([
            'content' => $request->content,
            'post_id' => $post->id,
            'user_id' => $request->user()->id,
            'is_approved' => false
        ]);

        $result = $comment->save();

        return new JsonResponse([
            'result' => $result,
        ]);
    }

    function approve() {}
}
