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
            <h4>Comments</h4>

            <div className="grid grid-cols-4 gap-4">
                {isLoading ? 'Fetching Comments...' :
                    data.data.comments ? data.data.comments.map((comment) => {
                        return (
                            <Comment 
                            comment={comment} 
                            key={Math.random().toString()}
                            previewOnly={true}
                            />
                        )
                    })
                    : 'No comments yet!'
                }
            </div>
        </div>
    );
}