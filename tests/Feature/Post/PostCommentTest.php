<?php

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;


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
    test_generate_user($this);

    $comment = Comment::factory()->create();
    $post = $comment->post()->get()->first();
    dd($comment->author()->get());
    $postAuthor = $post->author();

    dd($post, $postAuthor);
});
