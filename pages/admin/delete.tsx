import React from 'react'
import PostType from '../../interfaces/post'
import { PostPreview } from '../../components/posts'
import { get, remove } from 'firebase/database'
import { authors, posts } from '@firebase'
import Author from '../../interfaces/author'

type propsType = {
    posts: PostType[]
}

const DeletePage = ({ posts }: propsType) => {
    const handleDelete = () => {
        // TODO change the posts object from list to object to get access to key and be able to delete from it and add to it 
    }
    return (
        <>
            {
                posts.map((post) => (
                    <PostPreview
                        key={post.slug}
                        title={post.title}
                        coverImage={post.image}
                        date={post.date}
                        author={post.author}
                        slug={post.slug}
                        excerpt={post.excerpt}
                    />
                ))
            }
        </>
    )
}

export default DeletePage
export const getStaticProps = async () => {
    const _posts = await get(posts)
    const _authors = await get(authors)
    const __authors: Author[] = _authors.val()
    let postsData: { [key: string]: PostType } = _posts.val()
    let _postsData: PostType[] = []
    for (const key in postsData) {
        if (Object.prototype.hasOwnProperty.call(postsData, key)) {
            const post = postsData[key];
            _postsData.push({
                ...post,
                author: {
                    ...__authors['author_' + post.author]
                }
            })
        }
    }
    return {
        props: { posts: _postsData },
    }
}