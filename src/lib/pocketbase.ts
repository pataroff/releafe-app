import AsyncStorage from '@react-native-async-storage/async-storage';
import Pocketbase, { AsyncAuthStore } from 'pocketbase';

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
  initial: AsyncStorage.getItem('pb_auth'),
});

const pb = new Pocketbase(process.env.PB_URL, store);

export default pb;
