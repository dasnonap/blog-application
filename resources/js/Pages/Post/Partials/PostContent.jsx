import Markdown from "react-markdown"

export default function PostContent({post}){
    
    return (
        <div>
            <div className="mb-5">
                <h2 className="text-lg">
                    {post.title}
                </h2>
            </div>

            <Markdown>
                {post.content}
            </Markdown>
        </div>
    )
}