const https = require('https');

function fetchIcal(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchIcal(res.headers.location));
      }
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function test() {
  const indianHolidays = 'https://calendar.google.com/calendar/ical/en.indian%23holiday%40group.v.calendar.google.com/public/basic.ics';
  const moonPhases = 'https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics';

  try {
    const data1 = await fetchIcal(indianHolidays);
    console.log('Indian Holidays iCal length:', data1.length);
    console.log('Sample from Indian Holidays:\n', data1.split('\n').filter(l => l.includes('SUMMARY:')).slice(0, 5).join('\n'));
    
    const data2 = await fetchIcal(moonPhases);
    console.log('Moon Phases iCal length:', data2.length);
    console.log('Sample from Moon Phases:\n', data2.split('\n').filter(l => l.includes('SUMMARY:')).slice(0, 5).join('\n'));
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

test();
