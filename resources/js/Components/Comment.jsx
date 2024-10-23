import { Link } from "@inertiajs/react";

export default function Comment({comment, onCommentApproved, previewOnly = false}){
    const commentCreatedDate = new Date(comment.created_at);

    const handleApproveClick = (event) => {
        event.preventDefault();

        axios({
            url: route('comments.approve', {
                comment: comment.id
            }),
            method: 'post',
            headers:{
                'Accept': 'application/json',
            },
        })
        .then(({data}) => {
            onCommentApproved();
        })
        console.log('a');
    }

    return (
       <div className="max-w-md mx-auto my-4 bg-white border rounded-lg shadow-md">
            <div className="p-4">
                {!previewOnly ? 
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {comment.post.title}
                    </h3>
                : ''}
                
                <div className="text-sm text-gray-500 flex justify-between items-left flex-col mb-4">
                    <span className="block">
                        By: 
                        <span className="font-medium">{comment.author.name }</span>
                    </span>
                    <span className="block">
                        {commentCreatedDate.toLocaleString()}
                    </span>
                </div>

                <div className="mb-3">
                    <span className="block"><strong>Comment:</strong></span>
                    {comment.content}
                </div>
                
                {!previewOnly ? 
                    <div className="flex justify-between flex-col items-left gap-2">
                        <Link href={route('posts.view', {
                            post: comment.post.id
                        })} className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                            View Post
                        </Link>

                        <button className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900" onClick={handleApproveClick}>
                            Approve Comment
                        </button>
                    </div>
                : ''}
            </div>
        </div>

    )
}