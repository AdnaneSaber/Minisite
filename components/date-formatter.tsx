import { parseISO, format } from 'date-fns'

type Props = {
  dateString: number
}

const DateFormatter = ({ dateString }: Props) => {
  const date = new Date(dateString * 1000)
  return <time dateTime={dateString.toString()}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default DateFormatter
