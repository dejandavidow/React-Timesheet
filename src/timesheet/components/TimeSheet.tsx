import React, { useEffect, useState } from 'react'
import TimeSheetHeader from './TimeSheetHeader'
import { Badge, BadgeProps, Calendar } from 'antd';
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
import 'antd/dist/antd.css';
import { getTimeSheets } from '../service/timesheet-service';
import { TsModel } from '../model/TsModel';

const TimeSheet = () => 
{

   const[timesheets,setTimeSheets] = useState<TsModel[]>([])
      useEffect(() => {
          getTimeSheets().then(data => setTimeSheets(data))
          console.log(timesheets)
        },[])
      const handleSelect = () =>
      {
        alert("Opened")
        console.log()
      }

  return (
   <div className='container bgcolor'>
        <TimeSheetHeader/>
          <Calendar
            onSelect={handleSelect}
            />
   </div>
  )
}
export default TimeSheet