<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveCommentRequest;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use LogicException;

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

    /**
     * Approve a comment
     * @param Comment $comment the comment to approve
     * @return JsonResponse
     */
    function approve(Comment $comment, Request $request): JsonResponse
    {
        $loggedUser = $request->user();
        $post = $comment->post()->get()->first();

        if (! $post->isUserTheAuthor($loggedUser)) {
            throw new LogicException('The current user is not the author');
        }

        $comment->approve();

        return new JsonResponse([
            'response' => $comment->is_approved,
        ]);
    }

    /**
     * Delete a comment, only a user connected to either the Comment or the Post can delete it
     * @param Comment $comment
     * @param Request $request
     * @return JsonResponse
     */
    function delete(Comment $comment, Request $request): JsonResponse
    {
        $loggedUser = $request->user();

        if (! $comment->isUserRelatedToComment($loggedUser)) {
            throw new LogicException('The user is not related to either the post nor the comment');
        }

        return new JsonResponse([
            'success' => $comment->delete()
        ]);
    }
}
