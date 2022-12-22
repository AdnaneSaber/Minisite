import { authors, posts } from '@firebase'
import { child, get, remove } from 'firebase/database'
import { useRouter } from 'next/router'
import React from 'react'
import { PostEdit } from '../../../../components/posts'
import { dataType } from '../../../../components/posts/post-edit'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Author from '../../../../interfaces/author'
import { PostType } from '../../../../interfaces/post'

const EditPost = ({ post }) => {
    const { query: { slug } } = useRouter()
    const handleEdit = (e: React.FormEvent, data: dataType) => {
        e.preventDefault()
        console.log(data)
        console.log(slug)
    }
    const handleDelete = async (e: React.FormEvent) => {
        toast("Wow so easy!")
        toast.promise(remove(child(posts, typeof slug === "string" ? slug : slug.join("/"))), {
            pending: "Deleting the post",
            error: "Encountered a problem while deleting product",
            success: "Post deleted successfully !"
        }, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        e.preventDefault()
    }
    return (
        <>
            <ToastContainer />
            <PostEdit handleSubmit={handleEdit} defaultValues={post} handleDelete={handleDelete} />
        </>
    )
}

export default EditPost

type Params = {
    params: {
        slug: string
    }
}
export async function getStaticProps({ params }: Params) {
    const post = await (await get(child(posts, params.slug))).val()
    return {
        props: {
            post
        },
    }
}

export async function getStaticPaths() {
    const _posts = await get(posts)
    let postsData: { [key: string]: PostType } = _posts.val()
    return {
        paths: Object.keys(postsData).map((post: string) => {
            return {
                params: {
                    slug: post,
                },
            }
        }),
        fallback: false,
    }
}
