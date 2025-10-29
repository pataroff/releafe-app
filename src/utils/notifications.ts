import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IDiaryEntry, IWorryEntry} from "../types";

export const evaluateScheduleNotification = async (
    trigger: boolean,
    key: string,
    scheduleFn: () => Promise<void>
) => {
  const existingId = await AsyncStorage.getItem(key);

  if (trigger) {
    if (!existingId) {
      await scheduleFn();
      return;
    }

    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const stillScheduled = scheduled.some(n => n.identifier === existingId);
    if (stillScheduled) return;

    await AsyncStorage.removeItem(key);
    await scheduleFn(); // Ensure the notification is rescheduled after being delivered
    return;
  } else {
    if (existingId) {
      try {
        await Notifications.cancelScheduledNotificationAsync(existingId);
      } finally {
        await AsyncStorage.removeItem(key);
      }
    }
  }
};

export const shouldRemindDashboardInactivity = async () => {
  const lastOpenedRaw = await AsyncStorage.getItem('DASHBOARD_LAST_OPENED');
  if (!lastOpenedRaw) return false;
  const lastOpened = new Date(lastOpenedRaw);
  const days = Math.floor((Date.now() - lastOpened.getTime()) / 86_400_000);
  return days >= 6;
};

export const shouldRemindExercisesInactivity = async () => {
  const lastUsedRaw = await AsyncStorage.getItem('EXERCISES_LAST_USED');
  if (!lastUsedRaw) return false;
  const days = Math.floor((Date.now() - new Date(lastUsedRaw).getTime()) / 86_400_000);
  return days >= 7;
};

export const shouldRemindWorryBox = (worryEntries: IWorryEntry[], diaryEntries: IDiaryEntry[]) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const recentWorries = worryEntries.some(e => new Date(e.date) >= sevenDaysAgo);
  if (recentWorries) return false;

  const recentDiary = diaryEntries.filter(e => new Date(e.date) >= sevenDaysAgo);
  if (recentDiary.length === 0) return false;

  const avgAnxiety = recentDiary.reduce((s, e) => s + e.sliderValues[1], 0) / recentDiary.length;
  return avgAnxiety >= 7;
};
