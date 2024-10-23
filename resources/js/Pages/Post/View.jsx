import { Head } from "@inertiajs/react";
import PostContent from "./Partials/PostContent";
import PostComments from "./Partials/PostComments";

export default function View({post}){
    return (
        <>
            <Head title={post.title}/>

            <PostContent 
                post={post}
            />

            <PostComments 
                post={post}
            />
        </>
    );
}