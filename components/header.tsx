import Link from 'next/link'

const Header = () => {
  return (
    <h2 className="text-5xl md:text-5xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" className="hover:underline">
        Blog.
      </Link>
    </h2>
  )
}

export default Header
