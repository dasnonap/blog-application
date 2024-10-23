import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CommentsListing from "./CommentsListing"
const queryClient = new QueryClient();

export default function PostComments({post}){
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <CommentsListing 
                    post={post}
                />
            </QueryClientProvider>
        </div>
    )
}