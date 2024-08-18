import AsyncStorage from '@react-native-async-storage/async-storage';
import Pocketbase, { AsyncAuthStore } from 'pocketbase';

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
  initial: AsyncStorage.getItem('pb_auth'),
});

const pb = new Pocketbase(process.env.PB_URL, store);

// To run on a real device you need to find the IP address
// of the device, which the server runs on by running
// `ipconfig getifaddr en0` in the terminal. After that
// run `./pocketnase serve --http YOUR_IP:PORT` and ensure
// that the Pocketbase SDK is pointing to this IP address.
// const pb = new Pocketbase('http://192.168.1.5:8090', store);

export default pb;
