import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

import '@mdxeditor/editor/style.css'

export default function PostForm({}){
    const titleInput = useRef();
    const contentInput = useRef();
    const [formErrors, setFormErrors] = useState();
    const [pubslishedPost, setPubslishedPost] = useState();

    const {
        data, 
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful
    } = useForm({
        title: '',
        content: ''
    });

    const isFormValid = () => {
        let errors = '';

        Object.keys(data).map((key) => {
            if (data[key].length == 0) {
                errors += `The ${key} field is required\n`;
            }
        });

        if (errors.length > 0) {
            setFormErrors(errors);
        }

        return errors.length == 0;
    }

    const handleCreatePost = (event) => {
        event.preventDefault();

        if (! isFormValid()) {
            return;
        }
        
        axios({
            method: 'post',
            url: route('posts.create'),
            data: data,
            headers:{
                'Accept': 'application/json',
            },
        })
        .then(({data}) => {
            reset();
            setFormErrors('');
            setPubslishedPost(data.post);
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
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Create post
                </h2>
            </header>
            
            <form className="mt-6 space-y-6" onSubmit={handleCreatePost}>

                {formErrors ? 
                    <div className="text-red-600">
                        {formErrors}
                    </div>
                : ''}
                <div>
                    <InputLabel 
                        htmlFor="title"
                        value="Title"
                    />

                    <TextInput
                        ref={titleInput}
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError
                        message={errors.title}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel 
                        htmlFor="content"
                        value="Content"
                    />

                    <MDXEditor 
                        markdown={data.content}
                        ref={contentInput}
                        value={data.content}
                        onChange={(content) => setData('content', content)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"
                        plugins={[
                            toolbarPlugin({
                            toolbarContents: () => (
                                <>
                                    {' '}
                                    <UndoRedo />
                                    <BoldItalicUnderlineToggles />
                                </>
                            )
                            })
                        ]}
                    />

                    <InputError
                        message={errors.content}
                        className="mt-2"
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    {pubslishedPost ? 
                        <Link href={route('posts.view', {
                            'post' : pubslishedPost
                        })}>
                            View
                        </Link>
                    : ''}
                </div>
            </form>
        </section>
    )
}