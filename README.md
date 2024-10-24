# Blog Application

This project is a blog application built on top of the Laravel Breeze base theme. It includes essential blog features such as creating posts, commenting on posts, and author-controlled comment approval. Unauthenticated users can browse posts, but only authenticated users can create posts and comment.

## Features

### Out-of-the-box Laravel Breeze Features:
- User authentication (login, registration, password reset)
- Simple UI scaffolding for basic Laravel authentication

### Custom Functionalities:
1. **Post Creation**: 
   - Authenticated users can create and manage their own posts.
   
2. **Commenting on Posts**: 
   - Authenticated users can submit comments on any post.
   
3. **Comment Approval**:
   - The author of a post must approve comments before they are publicly visible.
   
4. **Post Listing**: 
   - Unauthenticated users can view the post listings and visit single post pages without the need for authentication.

## Entities

### 1. **Post**:
   - Represents a blog post created by a user.
   - Each post is associated with an author (user).
   
### 2. **Author**:
   - The author of the posts who also controls the approval of comments on their posts.
   
### 3. **Comment**:
   - Users can comment on posts. Comments require approval from the post's author to be publicly visible.

## Installation & Setup

This project uses **Laravel Sail** for development. Follow these steps to set up the project:

### Prerequisites
Ensure that you have the following installed:
- **Docker**: Laravel Sail requires Docker to run the application.

### Steps to Set Up the Project:

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:dasnonap/blog-application.git
   cd blog-application
   ```

2. **Install Dependencies**:

   Run the following command to install the dependencies:

   ```bash
   ./vendor/bin/sail composer install
   ```

3. **Copy the `.env` File**:

   Copy the `.env.example` file and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

4. **Generate Application Key**:

   Generate the Laravel application key:

   ```bash
   ./vendor/bin/sail artisan key:generate
   ```

5. **Configure the Database**:

   Ensure the database connection settings are correct in your `.env` file. If you are using Sail, the default database configuration should work.

   Example:
   ```
   DB_CONNECTION=mysql
   DB_HOST=mysql
   DB_PORT=3306
   DB_DATABASE=blog
   DB_USERNAME=sail
   DB_PASSWORD=password
   ```

6. **Run Migrations**:

   Run the database migrations to create the necessary tables:

   ```bash
   ./vendor/bin/sail artisan migrate
   ```

7. **Run the Seeder (Optional)**:

   If you want to seed the database with some sample data, you can run the seeders:

   ```bash
   ./vendor/bin/sail artisan db:seed
   ```

8. **Start the Development Server**:

   To start the server, run the following command:

   ```bash
   ./vendor/bin/sail up
   ```

   The application should now be accessible at `http://localhost`.

### Additional Commands

- **Run Tests**:

   You can run the test suite with Sail:

   ```bash
   ./vendor/bin/sail artisan test
   ```

- **Stop Sail**:

   To stop the Sail environment, run:

   ```bash
   ./vendor/bin/sail down
   ```

## Conclusion

This blog application extends the basic Laravel Breeze setup with additional features like post creation, comment submission, and author-driven comment moderation. With Laravel Sail, it's easy to get the project up and running using Docker.
