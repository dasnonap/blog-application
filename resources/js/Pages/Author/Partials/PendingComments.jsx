import Comment from "@/Components/Comment";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function PendingComments({}){
    const queryClient = useQueryClient();

    const fetchAuthorPendingComments = async () => {
        return await axios.get(route('user.comments'));
    }

    const onCommentApproved = () =>{
        queryClient.invalidateQueries("author_comments");
    }
    
    const {data, error, isLoading, isError} = useQuery({
        queryFn: fetchAuthorPendingComments,
        queryKey: ['author_comments'],
        refetchOnWindowFocus:false 
    });
    return (
        <div>
            <h4>
                Pending Comments
            </h4>

            <div className="grid grid-cols-4 gap-4">
                {isLoading ? 'Fetching Pending Comments...' :
                    data.data.comments ? data.data.comments.map((comment) => {
                        return (
                            <Comment 
                                comment={comment} 
                                key={Math.random().toString()}
                                onCommentApproved={onCommentApproved}
                            />
                        )
                    })
                    : 'No comments yet!'
                }
            </div>
            
        </div>
    )   
}