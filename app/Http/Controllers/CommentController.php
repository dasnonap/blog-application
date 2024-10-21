<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveCommentRequest;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Create a comment
     */
    function create(Post $post, SaveCommentRequest $request): JsonResponse {}
}
