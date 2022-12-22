import Script from 'next/script'
import React, { FormEvent, ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames';
import LayoutAdmin, { TextContext } from '../../../components/admin/layout';
import { CMS_NAME } from '../../../lib/constants';
import slugify from 'slugify';
import { push, update as updateDB } from 'firebase/database';
import { posts } from '@firebase';
import { PostEdit } from '../../../components/posts';

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

    const handleSubmit = (e: FormEvent, data: dataType) => {
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

    return (
        <PostEdit handleSubmit={handleSubmit} />
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