<?php

use App\Models\User;
use App\Models\Post;

test('user can create post', function () {
    $response = $this->get('/');

    $user = User::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();

    $response = $this->post('/api/posts/create', [
        'title' => 'example',
        'content' => fake()->text(300)
    ]);

    $response->assertStatus(200);
});
