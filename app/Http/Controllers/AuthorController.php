<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Get Author Pending Comments
     */
    function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $comments = Comment::whereHas('post', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('is_approved', false)->get();

        return new JsonResponse([
            'comments' => CommentResource::collection($comments)->toArray($request)
        ]);
    }
}
