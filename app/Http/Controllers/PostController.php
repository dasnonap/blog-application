<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Get all Posts
     * @return JsonResponse 
     */
    function index(): JsonResponse
    {

        return new JsonResponse([]);
    }

    /** 
     * Create a Post
     * @param Request $request
     * 
     */
    function create(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'string:required',
            'content' => 'string:required'
        ]);

        $post = new Post([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => $request->user()->id,
        ]);

        $post->save();

        return new JsonResponse([
            'post' => $post->id
        ]);
    }
}
