<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavePostRequest;
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
     * @param SavePostRequest $request the incomming request
     * @return JsonResponse the response result
     */
    function create(SavePostRequest $request): JsonResponse
    {
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

    /** 
     * Update a post
     * @param Post $post the post
     * @param SavePostRequest $request the incomming request
     * @return JsonResponse response
     */
    function update(Post $post, SavePostRequest $request): JsonResponse
    {
        $post->update([
            'title' => $request->title,
            'content' => $request->content
        ]);

        $post->save();

        return new JsonResponse([
            'post' => $post->id
        ]);
    }

    /**
     * Delete a post
     * @param Post $post the post
     * @return JsonResponse the status response 
     */
    function delete(Post $post): JsonResponse
    {
        return new JsonResponse([
            'success' => $post->delete()
        ]);
    }
}
