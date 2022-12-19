import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: number
  image: string
  author: Author
  excerpt: string
  content: string
}

export default PostType
