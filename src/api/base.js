import Airtable from 'airtable';

const API_KEY = 'keylTKlDjHKfwa3KZ'; 

export const base = new Airtable({ apiKey: `${API_KEY}` }).base('appkKg9mOC3CI2pPD');

// base('stock').select({
//   view: 'Grid view'
// }).firstPage(function (err, records) {
//   if (err) { console.error(err); return; }
//   records.forEach(function (record) {
//     console.log('Retrieved', record.get('stock_name'));
//   });
// });

// export default axios.create({
//   baseURL: 'https://api.airtable.com/v0/appkKg9mOC3CI2pPD',
//   headers: {
//     'Content-type': 'application/json'
//   }
// })
// var Airtable = require('airtable');