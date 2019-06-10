import * as types from '../constants/action-types';
import {base} from '../api/base';

export const prevMonth = () => ({
  type: types.CALENDAR_PREV_MONTH
})

export const nextMonth = () => ({
  type: types.CALENDAR_NEXT_MONTH
})

export const fetchRecords = () => {
  const query = base('stock').select({ view: 'Grid view' })
  return query.firstPage()
}

export const addRecord = (rate, date) => {
  return base('stock').create({
    "stock_name": "John Doe",
    "stock_price": parseFloat(rate),
    "stock_date": date
  });
}

export const deleteRecord = (id) => {  
  return base('stock').destroy(id);
}
