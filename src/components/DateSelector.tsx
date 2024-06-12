'use client'

import { isPast } from 'date-fns'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type TDateSelectorProps = {
  range: DateRange
  setRange: React.Dispatch<React.SetStateAction<DateRange>>
}
const DateSelector = ({ range, setRange }: TDateSelectorProps) => {
  return (
    <DayPicker
      mode='range'
      className='mx-auto place-content-center'
      onSelect={(range) => {
        console.log('=== DateSelector range', range)
        range?.from && setRange({ from: range.from, to: range.to })
      }}
      selected={range}
      fromMonth={new Date()}
      fromDate={new Date()}
      toYear={new Date().getFullYear() + 5}
      captionLayout='dropdown'
      numberOfMonths={2}
      disabled={(curDate) => isPast(curDate)}
    />
  )
}

export default DateSelector
