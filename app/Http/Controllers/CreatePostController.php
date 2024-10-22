<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CreatePostController extends Controller
{

    /**
     * Create Post page
     * @return Response $response
     */
    function create(): Response
    {
        return Inertia::render('Post/Create');
    }
}
