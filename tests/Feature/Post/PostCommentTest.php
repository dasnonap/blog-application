<?php

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;

/**
 * Login as a user
 */
function test_auth_as_user($closure, User $user): void
{
    $closure->post('/logout');

    $closure->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $closure->assertAuthenticated();
}

test('user can create comment', function () {
    test_generate_user($this);

    $post = Post::factory()->create();

    $path = sprintf('/api/posts/%s/comments', $post->id);

    $response = $this->post($path, [
        'content' => fake()->text(50)
    ]);

    $response->assertStatus(200);

    expect($response->getData()->result)
        ->toBeBool()
        ->not->toBeFalse();
});

test('user can approve a comment', function () {
    $comment = Comment::factory()->create();
    $postComment = $comment->post()->get()->first();
    $postAuthor = $postComment->author()->get()->first();

    test_auth_as_user($this, $postAuthor);

    $path = sprintf('/api/comments/%s/approve', $comment->id);

    $response = $this->post($path);

    $response->assertStatus(200);
});

test('author can remove a comment', function () {
    $comment = Comment::factory()->create();
    $commentAuthor = $comment->author()->get()->first();

    test_auth_as_user($this, $commentAuthor);

    $path = sprintf('/api/comments/%s/delete', $comment->id);

    $response = $this->post($path);

    $response->assertStatus(200);
});

test('commets are deleted if a post is deleted', function () {
    $comment = Comment::factory()->create();
    $postComment = $comment->post()->get()->first();
    $postAuthor = $postComment->author()->get()->first();

    test_auth_as_user($this, $postAuthor);

    $path = sprintf('/api/posts/%s/delete', $postComment->id);

    $response = $this->post($path);

    $response->assertStatus(200);

    $deletedPostComments = Comment::where(['post_id' => $postComment->id])->get()->first();

    dd($deletedPostComments);

    expect($deletedPostComments)
        ->toBeNull();
});
