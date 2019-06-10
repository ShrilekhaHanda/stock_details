import React from 'react';

import CalendarNavContainer from '../containers/CalendarNavContainer';

import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';

const Calendar = ({ allData, fetchRecords }) => {  
    return (
      <div className='calendar'>
        <CalendarNavContainer />
        <CalendarHeader />
        <CalendarMonth allData={allData} fetchRecords={fetchRecords}/>
      </div>
    )
}

export default Calendar;
