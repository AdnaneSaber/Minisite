import { AppProps } from 'next/app'
import '../styles/index.css'
import { ThemeProvider, useTheme } from 'next-themes';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode | null
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const { theme, systemTheme, setTheme } = useTheme();
  const [dark, setDark] = useState(false);
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
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={dark ? 'dark' : 'light'}
      enableSystem
    >
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

const defaultGetLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )

}