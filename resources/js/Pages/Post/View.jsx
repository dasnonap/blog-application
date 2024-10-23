import { Head, Link } from "@inertiajs/react";
import PostContent from "./Partials/PostContent";
import PostComments from "./Partials/PostComments";
import MenuLayout from "@/Layouts/MenuLayout";
import PostMeta from "./Partials/PostMeta";
import CommentForm from "./Partials/CommentForm";

export default function View({post, user}){
    return (
        <MenuLayout user={user}>
            <Head title={post.title}/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 mb-6 gap-4 items-start">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg col-span-3">
                            <div className="p-6 text-gray-900">
                                <PostContent 
                                    post={post}
                                />
                            </div>
                        </div>

                        
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg grow-0">
                            <div className="p-6 text-gray-900">
                                <PostMeta 
                                    post={post} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <PostComments 
                                post={post}
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                         {user ? 
                            <CommentForm 
                                post={post}
                            />
                            : 
                            <div>
                                <Link href={route('login')}>
                                    Login to Comment
                                </Link>
                            </div> 
                        }
                        </div>
                    </div>
                </div>
            </div>
        </MenuLayout>
    );
}

