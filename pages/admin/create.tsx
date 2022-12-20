import Script from 'next/script'
import React, { FormEvent, ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames';
import LayoutAdmin, { TextContext } from '../../components/admin/layout';
import { CMS_NAME } from '../../lib/constants';
import slugify from 'slugify';
import { push, update as updateDB } from 'firebase/database';
import { posts } from '@firebase';

type dataType = {
    title: string,
    slug: string,
    date: number,
    excerpt: string,
    image: string,
    author: number,
    content: string
}
const create = () => {
    const editorRef = useRef(null);
    const [dragOver, setDragOver] = useState(false)
    const [data, setData] = useState<dataType>()

    const { state, update } = useContext(TextContext);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let el = data
        if (editorRef.current) {
            el = { ...el, content: editorRef.current.getContent() }
        }
        el = {
            ...el,
            author: 0,
            date: new Date().getTime(),
            slug: slugify(el.title, {
                lower: true,
                replacement: "_"
            })
        }
        const newPostKey = push(posts).key;
        const updates = {};
        updates[newPostKey] = el;
        updateDB(posts, updates);
    }
    const handleClickUpload = () => {
        update(e => {
            return { ...e, active: true }
        })
    }
    useEffect(() => {
        setData(e => {
            return { ...e, image: state.path }
        })

    }, [state.path])

    return (
        <div>
            <div className="">
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="article-title" className="block text-sm font-medium text-gray-700">
                                            Article title
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="article-title"
                                                required
                                                id="article-title"
                                                onChange={e => setData(old => { return { ...old, title: e.target.value } })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                                        Excerpt
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="excerpt"
                                            name="excerpt"
                                            onChange={e => setData(old => { return { ...old, excerpt: e.target.value } })}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Lorem ipsum dolor..."
                                            defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Brief description about the content that will be shown on the article preview.
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        About
                                    </label>
                                    <div className="mt-1">
                                        <Editor
                                            apiKey='xk5ocitkbtei466ugy5u5u4d2bs1lokeroh3gffu0wjxc2cs'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue="<p>This is the initial content of the editor.</p>"
                                            id="about"
                                            onFocus={(e) => e.target.editorContainer.className = "!border-indigo-500 !ring-indigo-500 !shadow-sm tox tox-tinymce "}
                                            onBlur={(e) => e.target.editorContainer.className = "!border-gray-300 !shadow-sm tox tox-tinymce"}
                                            textareaName="about"

                                            init={{
                                                height: 300,
                                                body_class: classNames("mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"),
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat image | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Content of the article page.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                    <div className={classNames("mt-1 flex justify-center flex-col gap-8 rounded-md border-2 border-gray-300 px-6 pt-5 pb-6 cursor-pointer", dragOver ? "border-solid" : "border-dashed")} onDragEnter={(e) => setDragOver(true)} onDragLeave={() => setDragOver(false)} >
                                        {state.path ?
                                            <div className="rounded overflow-hidden">
                                                <img src={state.path} alt={CMS_NAME} />
                                            </div> :
                                            <></>
                                        }
                                        <div className="space-y-1 text-center">
                                            <button
                                                type="button"
                                                onClick={handleClickUpload}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Upload or Pick image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
create.getLayout = (page: ReactElement) => {
    return (
        <LayoutAdmin>
            {page}
        </LayoutAdmin>
    )
}
export default create