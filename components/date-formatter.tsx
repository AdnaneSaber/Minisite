import { parseISO, format } from 'date-fns'

type Props = {
  dateString: number
}

const DateFormatter = ({ dateString }: Props) => {
  const date = new Date(dateString)
  return <time dateTime={dateString.toString()}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default DateFormatter
