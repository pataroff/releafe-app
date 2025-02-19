import PocketBase from 'pocketbase';
import { v4 as uuidv4 } from 'uuid';

// Initialize PocketBase client
const pb = new PocketBase('https://releafe-app.pockethost.io/');

// Generate random slider values
function generateSliderValues() {
  const values = {};
  for (let i = 0; i < 6; i++) {
    values[i] = Math.floor(Math.random() * 10) + 1; // Random values between 1 and 10
  }
  return values;
}

// Create multiple diary entries
async function populateDiaryEntries() {
  const userId = '50vxlm6yhgf6wvo'; // userId matching Ivan

  // Generate dates for 365 entries, starting from one year ago
  const entries = 365;
  const today = new Date();

  // Loop through each day, creating one entry per day
  for (let i = 0; i < entries; i++) {
    const recordDate = new Date(today);
    recordDate.setDate(today.getDate() - i); // Subtract 'i' days from today

    const record = {
      collectionId: 't5v105j16m3xef8',
      collectionName: 'diary_entries',
      created: new Date().toISOString(),
      date: recordDate.toISOString(),
      sliderValues: generateSliderValues(),
      textValues: {}, // Modify if needed
      updated: new Date().toISOString(),
      user: userId,
      uuid: uuidv4(),
    };

    try {
      const createdRecord = await pb.collection('diary_entries').create(record);
      console.log(`Created record for date: ${recordDate.toISOString()}`);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  }
}

// async function deleteDiaryEntries() {
//   const userId = '50vxlm6yhgf6wvo'; // User ID
//   const oneYearAgo = new Date();
//   oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

//   try {
//     // Fetch all diary entries for the user within the past year
//     const records = await pb.collection('diary_entries').getFullList({
//       filter: `user = "${userId}" && date >= "${oneYearAgo.toISOString()}"`,
//     });

//     if (records.length === 0) {
//       console.log('No records found for deletion.');
//       return;
//     }

//     console.log(`Found ${records.length} records. Deleting...`);

//     // Delete each record
//     for (const record of records) {
//       await pb.collection('diary_entries').delete(record.id);
//       console.log(`Deleted record: ${record.id}`);
//     }

//     console.log('All records deleted successfully.');
//   } catch (error) {
//     console.error('Error deleting records:', error);
//   }
// }

populateDiaryEntries();
