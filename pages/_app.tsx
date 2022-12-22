import { AppProps } from 'next/app'
import '../styles/index.css'
import { ThemeProvider, useTheme } from 'next-themes';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import ErrorPage from 'next/error'
import { NextPage } from 'next';
import Layout from '../components/layout';
import { getLogos } from '../lib/getLogos';
import Router, { useRouter } from 'next/router';
import { getIdToken } from 'firebase/auth';
import { auth } from '@firebase';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode | null
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const router = useRouter()
  const { theme, systemTheme, setTheme } = useTheme();
  const [dark, setDark] = useState(false);
  const [rendering, setRendering] = useState(<div></div>)
  // TODO Fix the theme color Dark/Light
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setDark(true);
      }
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setTheme(event.matches ? 'dark' : 'light');
      });
  }, [theme]);
  const getLayout = Component.getLayout ? Component.getLayout : Component.getLayout === null ? ((page) => page) : defaultGetLayout
  // onIdTokenChanged(auth, (user) => {
  //   console.log(user)
  //   if (typeof router.pathname === "string" && router.pathname.startsWith('/admin/')) {
  //     if (!user) {
  //       router.push('/')
  //     }
  //   }
  // // })
  // const handleRender = async () => {
  //   const token = auth.currentUser
  //   !token && router.pathname.startsWith('/admin/') ? setRendering(getLayout(<ErrorPage statusCode={404} />)) : setRendering(getLayout(<Component {...pageProps} />))
  //   console.log(token)
  // }
  // useEffect(() => {
  //   (async () => {
  //     await handleRender()
  //   })()
  // }, [router.pathname])

  return (
    <React.Suspense>
      <ThemeProvider
        attribute="class"
        defaultTheme={dark ? 'dark' : 'light'}
        enableSystem
      >
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </React.Suspense>
  )


}

const defaultGetLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )

}