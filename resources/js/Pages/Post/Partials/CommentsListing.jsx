import Comment from "@/Components/Comment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CommentsListing({post}){
    const queryClient = useQueryClient();
    const postId = post.id;
    
    const fetchPostComments = async () => {
        return await axios.get(route('posts.comments',{
            post: postId
        }));
    }
    const {data, error, isLoading, isError} = useQuery({
        queryFn: fetchPostComments,
        queryKey: ['comments'],
        refetchOnWindowFocus:false 
    });

    return (
        <div>
            {isLoading ? 'Fetching Comments...' :
                data.comments ? data.comments.map((comment) => {
                    return (
                        <Comment 
                            comment={comment} 
                            key={Math.random().toString()}
                        />
                    )
                })
                : 'No comments yet!'
            }
        </div>
    );
}