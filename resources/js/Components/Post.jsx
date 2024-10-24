import { Link } from "@inertiajs/react";
import Markdown from "react-markdown";

export default function Post({post}){
    const postCreatedDate = new Date(post.created_at);
    
    return (
        <div className="max-w-md mx-auto my-4 bg-white border rounded-lg shadow-md">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                </h3>
                
                <div className="text-sm text-gray-500 flex justify-between items-left flex-col mb-4">
                    <span className="block">
                        By: 
                        <span className="font-medium">{post.author.name }</span>
                    </span>
                    <span className="block">
                        {postCreatedDate.toLocaleString()}
                    </span>
                </div>

                <div className="mb-3">
                    <Markdown>
                        { post.content.split(' ').slice(0, 10).join(' ')}
                    </Markdown>
                </div>
                
                <div className="flex justify-between flex-col items-left gap-2">
                    <Link href={route('posts.view', {
                        post: post.id
                    })} className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        View Post
                    </Link>
                </div>
            </div>
        </div>
    )
}