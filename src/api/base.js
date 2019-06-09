import Airtable from 'airtable';

const API_KEY = 'keylTKlDjHKfwa3KZ'; 

export const base = new Airtable({ apiKey: `${API_KEY}` }).base('appkKg9mOC3CI2pPD');
