import Avatar from '../avatar'
import DateFormatter from '../date-formatter'
import CoverImage from '../cover-image'
import Link from 'next/link'
import type Author from '../../interfaces/author'
import { IPosts } from '../../interfaces/post'
type propType = {
  post: IPosts['']
  link: string
}
const PostPreview = ({ post: {
  title,
  image,
  date,
  excerpt,
  author
}, link }: propType) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={link} title={title} src={image} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={link}
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.image} />
    </div>
  )
}

export default PostPreview
