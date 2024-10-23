import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useState, useRef } from "react";

export default function CommentForm({post}){
    const [formErrors, setFormErrors] = useState();
    const [responseMessage, setResponseMessage] = useState();
    const contentInput = useRef();

    const {
        data,
        setData,
        reset,
    } = useForm({
        content: ''
    });

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: route('posts.comment.create', {
                post: post.id
            }),
            data: data,
            headers:{
                'Accept': 'application/json',
            },
        })
        .then(({data}) => {
            reset();
            setFormErrors('');
            if (data.result == true) {
                setResponseMessage('The comment is submitted for approval');
            }
        })
        .catch((error) => {
            if (error.response) {
                setFormErrors(error.response.data.message);
            } else if (error.request) {
                setFormErrors(error.request);
            }
        });
    }
    
    return (
        <div>
            <header>
                <h4 className="text-lg font-medium text-gray-900">
                    Submit Comment
                </h4>
            </header>

            <form className="mt-6 space-y-6" onSubmit={handleCommentSubmit}>

                {formErrors ? 
                    <div className="text-red-600">
                        {formErrors}
                    </div>
                : ''}

                {responseMessage ? 
                    <div className="text-green-600">
                        {responseMessage}
                    </div>
                : ''}

                <div>
                    <InputLabel
                        htmlFor="content"
                        value="Content"
                    />

                    <Textarea 
                        ref={contentInput}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton>Submit</PrimaryButton>
                </div>
            </form>
        </div>
    );
}