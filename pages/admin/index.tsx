import { authors, posts } from '@firebase'
import { get } from 'firebase/database'
import React from 'react'
import Nav from '../../components/nav'
import PostPreview from '../../components/post-preview'
import Author from '../../interfaces/author'
import PostType from '../../interfaces/post'

type propType = {
    postsData: PostType[]
}

const Admin = ({ postsData }: propType) => {
    return (
        <div>
            <Nav />
            {postsData.length > 0 ? <div className='mx-auto container px-5'>
                <div className="grid grid-cols-1 mx-auto md:grid-cols-2 xl:grid-cols-3 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                    {postsData.map((post, index) =>
                        <PostPreview
                            author={post.author}
                            coverImage={post.image}
                            excerpt={post.excerpt}
                            date={post.date}
                            title={post.title}
                            slug={post.slug}
                            key={index}
                        />
                    )}
                </div>
            </div> : <h4>No data found</h4>}
        </div>
    )
}

export default Admin


export const getStaticProps = async () => {
    const _posts = await get(posts)
    const _authors = await get(authors)
    const __authors: Author[] = _authors.val()
    let postsData: PostType[] = _posts.val()
    postsData = postsData.map(post => {
        return {
            ...post,
            author: {
                ...__authors['author_' + post.author]
            }
        }
    })
    return {
        props: { postsData },
    }
}
