import Nav from './nav'
import Footer from './footer'
import Meta from './meta'
import KManager from './kmanager'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Nav />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
