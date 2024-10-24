import { useQueryClient, useQuery, keepPreviousData } from "@tanstack/react-query"
import { useState } from "react";
import Post from "./Post";

const fetchPosts = async (page) => {
    const url = new URL(route('posts.index'));

    url.searchParams.append('page', page);

    return await axios.get(url);
}

export default function PostListing({}){
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);

    const {data, error, isLoading, isError} = useQuery(
        {
            queryKey:['posts', page], 
            queryFn: () => fetchPosts(page),
            refetchOnWindowsFocus: false,
            keepPreviousData: true, 
        }
    );

    if (isError) {
        return(
            <div>
                {error}
            </div>
        )
    }

    return (
        <div>
            <h4>
                Post Listing
            </h4>

            <div className="grid grid-cols-4 gap-4">
                {isLoading ? 'Fetching Posts...' : 
                    data.data.posts ? 
                        data.data.posts.map((post) => {
                            return(
                                <Post
                                    key={Math.random().toString()}
                                    post={post}
                                />
                            )
                        })
                    : 'No posts'
                }
            </div>

            <div className="flex gap-4 items-center flex-row">
                {!isLoading ? 
                    page != 1 ? 
                        <button
                            onClick={() => {
                                setPage(page - 1)
                            }}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                        >
                            Prev Page
                        </button>
                    : ''
                : ''}

                {!isLoading ? 
                    data.data.last_page > page ? 
                        <button
                            onClick={() => {
                            if (data.data.last_page > page) {
                                setPage(page + 1)
                            }
                            }}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                        >
                            Next Page
                        </button>
                    : ''
                : ''}
            </div>
        </div>
    )
}