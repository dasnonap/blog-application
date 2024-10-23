import CommentsListing from "./CommentsListing"

export default function PostComments({post}){
    return (
        <div>
            <CommentsListing 
                post={post}
            />

            <div className="form">
                Add comment form
            </div>
        </div>
    )
}