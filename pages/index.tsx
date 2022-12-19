import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { authors, posts, storage } from '../lib/firebase'
import Post from '../interfaces/post'
import { get } from "firebase/database";
import Author from '../interfaces/author'
import { getDownloadURL, ref } from 'firebase/storage'
import { NextPage } from 'next'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'

type Props = {
  postsData: Post[]
}

const Index = ({ postsData }: Props) => {
  const heroPost = postsData[0]
  const morePosts = postsData.slice(1)
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
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  )
}
export const getStaticProps = async () => {
  const _posts = await get(posts)
  const _authors = await get(authors)
  const __authors: Author[] = _authors.val()
  let postsData: Post[] = _posts.val()
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
export default Index