import * as types from '../constants/action-types';
import {base} from '../api/base';

// const base = new Airtable({ apiKey: `keylTKlDjHKfwa3KZ` }).base('appkKg9mOC3CI2pPD');

export const prevMonth = () => ({
  type: types.CALENDAR_PREV_MONTH
})

export const nextMonth = () => ({
  type: types.CALENDAR_NEXT_MONTH
})

// export const addReminder = (weekIndex, weekdayIndex) => ({
//   type: types.ADD_REMINDER,
//   payload: { weekIndex, weekdayIndex }
// })

// export const editReminder = (weekIndex, weekdayIndex, reminder) => ({
//   type: types.EDIT_REMINDER,
//   payload: { weekIndex, weekdayIndex, reminder }
// })

// export const deleteReminder = (weekIndex, weekdayIndex, reminder) => ({
//   type: types.DELETE_REMINDER,
//   payload: { weekIndex, weekdayIndex, reminder }
// })


export const fetchRecords = () => {
  const query = base('stock').select({ view: 'Grid view' })
  return query.firstPage()
}

export const addRecord = (rate, date) => {
  return base('stock').create({
    "stock_name": "John Doe",
    "stock_price": parseInt(rate),
    "stock_date": date
  });
}

export const deleteRecord = (id) => {  
  return base('stock').destroy(id);
}



// export const fetchRecords = () => {
//   // let data = await base('stock');
//   // console.log(data)
//   // let res = await base('stock').select({
//   //         view: 'Grid view'
//   //       }).firstPage((err, records) => {
//   //           //console.log("records ", records)
//   //         if (err) { console.error(err); return; }
//   //         return records;
//   //       });

//   // console.log("res ", res)

//   const query = base('stock').select({ view: 'Grid view' })
//   // const res = await req.firstPage()

//   return query.firstPage()
//   // console.log("res await", res)

//   // return base('stock').select({
//   //   view: 'Grid view'
//   // }).firstPage((err, records) => {
//   //   console.log("records ", records)
//   //   if (err) { console.error(err); return; }
//   //   return records;
//   // });
// }
  // console.log('done')
  // await base('stock').select({
  //   view: 'Grid view'
  // }).firstPage(function (err, records) {
  //   if (err) { console.error(err); return; }
  //   records.forEach(function (record) {
  //     console.log('Retrieved', record.get('stock_name'));
  //   });
  // });
  // records.forEach(function (record) {
                    //   console.log('Retrieved', record.get('stock_name'));
                    // });