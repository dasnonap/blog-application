<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ViewPostController extends Controller
{
    function view(Post $post, Request $request): Response
    {
        return Inertia::render('Post/View', [
            'post' => (new PostResource($post))->toArray($request),
            'user' => $request->user()
        ]);
    }
}
