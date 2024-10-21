<?php

use App\Models\User;
use App\Models\Post;

/**
 * Generate and Authanticate User instance
 * @param $closure the Test closure
 * @return void
 */
function test_generate_user($closure): void
{
    $user = User::factory()->create();

    $closure->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $closure->assertAuthenticated();
}

/**
 * Validate if Post ID is correct post
 * @param $response
 * @return Post the post
 */
function test_validate_post_id_is_post($response): Post
{
    $post_id = $response->getData()->post;
    $post = Post::where(['id' => $post_id])->get()->first();

    expect($post)
        ->toBeObject()
        ->not->toBeNull();

    return $post;
}

test('user can create post', function () {
    $response = $this->get('/');

    test_generate_user($this);

    $response = $this->post('/api/posts/create', [
        'title' => 'example',
        'content' => fake()->text(300)
    ]);

    $response->assertStatus(200);

    test_validate_post_id_is_post($response);
});

test('user can update post', function () {
    $response = $this->get('/');

    test_generate_user($this);

    $post = Post::factory()->create();

    $path = sprintf('/api/posts/%s/update', $post->id);
    $postAttributes = [
        'title' => 'example changed',
        'content' => fake()->text(301)
    ];
    $response = $this->post($path, $postAttributes);

    $response->assertStatus(200);

    $updatedPost = test_validate_post_id_is_post($response);

    expect($updatedPost->getAttributes())
        ->toMatchArray($postAttributes);
});

test('user can delete post', function () {
    test_generate_user($this);

    $post = Post::factory()->create();

    $path = sprintf('/api/posts/%s/delete', $post->id);

    $response = $this->post($path);

    $response->assertStatus(200);

    $deletedPost = Post::where(['id' => $post->id])->get()->first();

    expect($deletedPost)
        ->toBeNull();
});

test('auth users can modify posts', function () {
    $response = $this->post('/api/posts/create', [
        'title' => 'example',
        'content' => fake()->text(300)
    ]);

    $response->assertRedirect('login');
});
