import { PostGrid, PostPreview } from './posts'
import type { IPosts } from '../interfaces/post'

type Props = {
  posts: IPosts
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <PostGrid posts={posts} />
    </section>
  )
}

export default MoreStories
