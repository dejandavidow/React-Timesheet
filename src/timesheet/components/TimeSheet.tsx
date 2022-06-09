import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import TimeSheetHeader from './TimeSheetHeader'

const TimeSheet = () => {
  return (
    <div className='container bgcolor'>
        <TimeSheetHeader/>
        <FullCalendar
        plugins={[ dayGridPlugin]}
      />
    </div>
  )
}

export default TimeSheet