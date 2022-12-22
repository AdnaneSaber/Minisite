import Container from '../components/container'
import MoreStories from '../components/more-stories'
import { HeroPost } from '../components/posts'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { authors, posts as postsRef, storage } from '../lib/firebase'
import { get } from "firebase/database";
import Author from '../interfaces/author'
import { getDownloadURL, ref } from 'firebase/storage'
import { NextPage } from 'next'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { IPosts } from '../interfaces/post'

type Props = {
  posts: IPosts
}

const Index = ({ posts }: Props) => {
  const heroPost = posts[Object.keys(posts)[0]]
  const morePosts = posts
  return (
    <>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.image}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts && <MoreStories posts={morePosts} />}
      </Container>
    </>
  )
}

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
export default Index