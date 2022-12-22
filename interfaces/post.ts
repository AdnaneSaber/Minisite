import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: number
  image: string
  author: Author
  excerpt: string
  content: string
  uid: string
}

interface IPosts {
  [key: string]: PostType
}


export type { IPosts, PostType }
