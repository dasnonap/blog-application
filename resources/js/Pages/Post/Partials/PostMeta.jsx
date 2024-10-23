export default function PostMeta({post}){
    const postedDate = new Date(post.created_at);
    const updatedDate = new Date(post.updated_at);

    return(
        <div>
            {post.author.name ? 
                <div className="mb-2">
                    Author: <em>{post.author.name}</em>
                </div>
            : ''}

            {post.created_at ?
                <div className="mb-2">
                    Posted at: <em>{postedDate.toLocaleString()}</em>
                </div>
            : ''}

            {post.updated_at ?
                <div className="mb-2">
                    Last Updated at: <em>{updatedDate.toLocaleString()}</em>
                </div>
            : ''}
        </div>
    );
}