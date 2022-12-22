import React from 'react'
import type { IPosts } from '../../../interfaces/post'
import { PostPreview, PostGrid } from '../../../components/posts'
import { get, remove, ref, child } from 'firebase/database'
import { authors, posts as postsRef } from '@firebase'
import Author from '../../../interfaces/author'
import Link from 'next/link'
type propsType = {
    posts: IPosts
}
const Posts = ({ posts }: propsType) => {
    return (
        <div className="container m-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                {Object.keys(posts).map((post, i) => (
                    <Link
                        as={`/admin/posts/edit/${post}`}
                        href={"/admin/posts/edit/[slug]"}
                    >
                        <PostPreview key={i} link={`/admin/posts/edit/${post}`} post={{ ...posts[post], uid: post }} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Posts

export const getStaticProps = async () => {
    const _posts = await get(postsRef)
    const _authors = await get(authors)
    const __authors: Author[] = _authors.val()
    let postsData: IPosts = _posts.val()
    let _postsData: IPosts = {}
    for (const key in postsData) {
        if (Object.prototype.hasOwnProperty.call(postsData, key)) {
            const post = postsData[key];
            post.author = __authors['author_' + post.author]
            _postsData[key] = post
        }
    }
    return {
        props: { posts: _postsData },
    }
}