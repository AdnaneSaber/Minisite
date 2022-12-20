import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import type PostType from '../../interfaces/post'
import { authors, posts } from '@firebase'
import { get } from 'firebase/database'
import Author from '../../interfaces/author'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Container>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>
                {post.title} | {CMS_NAME}
              </title>
              <meta property="og:image" content={post.image} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.image}
              date={post.date}
              author={post.author}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Container>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {

  const _posts = await get(posts)
  const __posts: PostType[] = _posts.val()
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
  const post = _postsData.filter(post => post.slug === params.slug)[0]
  return {
    props: {
      post: {
        ...post,
        author: {
          ...__authors['author_' + post.author]
        }
      }
    },
  }
}

export async function getStaticPaths() {
  const _posts = await get(posts)
  let postsData: { [key: string]: PostType } = _posts.val()
  let _postsData: PostType[] = []
  for (const key in postsData) {
    if (Object.prototype.hasOwnProperty.call(postsData, key)) {
      const post = postsData[key];
      _postsData.push({
        ...post,
      })
    }
  }
  return {
    paths: _postsData.map((post: PostType) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
