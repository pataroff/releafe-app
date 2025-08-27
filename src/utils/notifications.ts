import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const evaluateScheduleNotification = async (
  trigger: boolean,
  key: string,
  scheduleFn: () => Promise<void>
) => {
  const existingId = await AsyncStorage.getItem(key);

  if (trigger) {
    if (!existingId) {
      await scheduleFn();
    }
  } else {
    if (existingId) {
      await Notifications.cancelScheduledNotificationAsync(existingId);
      await AsyncStorage.removeItem(key);
      await scheduleFn();
    }
  }
};
