import React from 'react'
import { IPosts } from '../../interfaces/post'
import PostPreview from './post-preview'
type propsType = {
    posts: IPosts
    delete?: boolean
}
const PostGrid = ({ delete: remove = false, posts }: propsType) => {
    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                {Object.keys(posts).map((post, i) => (
                    <PostPreview key={i} post={{ ...posts[post], uid: post }} link={`/admin/posts/edit/${posts[post].slug}`} />
                ))}
            </div>
        </div>
    )
}

export default PostGrid