import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import * as Notifications from 'expo-notifications';
import { EventSubscription } from 'expo-modules-core';
import { registerForPushNotificationsAsync } from '../utils/registerForPushNotificationsAsync';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IDiaryEntry, IGoalEntry, IWorryListItem } from '../types';

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
  scheduleDailyNotification: (
    time: string,
    title: string,
    body: string,
    route?: { screen: string; params?: any } | undefined
  ) => Promise<void>;
  scheduleEvery3DaysNotification: () => Promise<void>;
  scheduleReminder3DaysNotification: (goal: IGoalEntry) => Promise<void>;
  scheduleDashboardInactivityNotification: () => Promise<void>;
  scheduleReminderWorryBoxNotification: (
    worryEntries: IWorryListItem[],
    diaryEntries: IDiaryEntry[]
  ) => Promise<void>;
  scheduleExerciseInactivityNotification: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

const DIARY_NOTIFICATION_KEY = 'DIARY_NOTIFICATION_ID';
const PERSONAL_GOALS_NOTIFICATION_KEY = 'PERSONAL_GOALS_NOTIFICATION_ID';
const PERSONAL_GOALS_DEADLINE_NOTIFICATION_KEY =
  'PERSONAL_GOALS_DEADLINE_NOTIFICATION_ID';
const DASHBOARD_INACTIVITY_NOTIFICATION_KEY =
  'DASHBOARD_INACTIVITY_NOTIFICATION_ID';
const WORRY_BOX_NOTIFICATION_KEY = 'WORRY_BOX_NOTIFICATION_ID';
const EXERCISES_NOTIFICATION_KEY = 'EXERCISES_NOTIFICATION_ID';

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const notificationListener = useRef<EventSubscription>();
  const responseListener = useRef<EventSubscription>();

  const navigation = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token),
      (error) => setError(error)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(
          '🔔 Notification received while the app is running: ',
          notification
        );
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          '🔔 Notification response whenever the user interacts with a notification: ',
          JSON.stringify(response, null, 2),
          JSON.stringify(response.notification.request.content.data, null, 2)
        );
        // Handle the notification response here
        const route = response.notification.request.content.data.route;
        if (route !== null) {
          // Navigate to the specified route
          // @ts-expect-error
          navigation.navigate(route.screen, route.params);
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const scheduleDailyNotification = async (
    time: string,
    title: string,
    body: string,
    route?: string | {}
  ) => {
    // Cancel previous daily notification if it exists
    const existingNotificationId = await AsyncStorage.getItem(
      DIARY_NOTIFICATION_KEY
    );

    if (existingNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        existingNotificationId
      );
    }

    const [hour, minute] = time.split(':').map(Number);

    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          route: route ?? null,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });

    await AsyncStorage.setItem(DIARY_NOTIFICATION_KEY, newNotificationId);
    console.log('DIARY_NOTIFICAITON_KEY', newNotificationId);
  };

  const scheduleEvery3DaysNotification = async () => {
    const existingNotificationId = await AsyncStorage.getItem(
      PERSONAL_GOALS_NOTIFICATION_KEY
    );
    if (existingNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        existingNotificationId
      );
    }

    // Calculate the next 16:00 time 3 days from now
    const now = new Date();
    const triggerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 3,
      16, // 16:00 hours
      0,
      0
    );

    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Zin om weer een stap te zetten?',
        body: 'Maak een doel aan voor jezelf en volg je voortgang.',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          route: {
            screen: 'Toolkit',
            params: {
              screen: 'PersonalGoals',
              // @TODO: Jan wants this to go to the first screen of goal setting!
            },
          },
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        repeats: true,
        hour: 16,
        minute: 0,
        weekday: undefined,
        day: triggerDate.getDate(),
        month: triggerDate.getMonth() + 1, // Expo Notifications months start from index 1, therefore we have to add 1!
        year: triggerDate.getFullYear(),
      },
    });

    await AsyncStorage.setItem(
      PERSONAL_GOALS_NOTIFICATION_KEY,
      newNotificationId
    );
    console.log('PERSONAL_GOALS_NOTIFICATION_KEY', newNotificationId);
  };

  const scheduleReminder3DaysNotification = async (goal: IGoalEntry) => {
    const existingNotificationId = await AsyncStorage.getItem(
      PERSONAL_GOALS_DEADLINE_NOTIFICATION_KEY
    );

    if (existingNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        existingNotificationId
      );
    }

    // @TODO: Luna removed 'endDate' from the goal, so it no longer exists!
    // ONLY WEEKLY/MONTHLY
    // END DATE SHOULD POINTS TO THE LAST DATE OF THAT SPECIFIC TIMEFRAME, WEEKLY,
    // LAST DAY OF THE WEEK IT WAS SET
    // LAST WEEK OF THE MONTH IT WAS SET
    const deadline = new Date(goal.endDate!);
    deadline.setDate(deadline.getDate() - 3); // 3 days before the goal's deadline
    deadline.setHours(10, 0, 0, 0); // At 10:00

    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hoe gaat het met je persoonlijke doelen?',
        body: 'Kijk of je vandaag iets kunt doen om ze te behalen.',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          route: {
            screen: 'Toolkit',
            params: {
              screen: 'PersonalGoals',
            },
          },
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        year: deadline.getFullYear(),
        month: deadline.getMonth() + 1, // months are 1-based
        day: deadline.getDate(),
        hour: deadline.getHours(),
        minute: deadline.getMinutes(),
      },
    });

    await AsyncStorage.setItem(
      PERSONAL_GOALS_DEADLINE_NOTIFICATION_KEY,
      newNotificationId
    );
    console.log('PERSONAL_GOALS_DEADLINE_NOTIFICAITON_KEY', newNotificationId);
  };

  const scheduleDashboardInactivityNotification = async () => {
    const existingNotificationId = await AsyncStorage.getItem(
      DASHBOARD_INACTIVITY_NOTIFICATION_KEY
    );

    if (existingNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        existingNotificationId
      );
    }

    const now = new Date();
    const triggerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 6,
      20, // 20:30
      30,
      0
    );

    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Even terugkijken?',
        body: 'Bekijk hoe het deze week met jou gaat.',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          route: {
            screen: 'WellbeingOverview',
          },
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        year: triggerDate.getFullYear(),
        month: triggerDate.getMonth() + 1,
        day: triggerDate.getDate(),
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
      },
    });

    await AsyncStorage.setItem(
      DASHBOARD_INACTIVITY_NOTIFICATION_KEY,
      newNotificationId
    );
    console.log('DASHBOARD_INACTIVITY_NOTIFICATION_KEY', newNotificationId);
  };

  const scheduleReminderWorryBoxNotification = async (
    worryEntries: IWorryListItem[],
    diaryEntries: IDiaryEntry[]
  ) => {
    const existingNotificationId = await AsyncStorage.getItem(
      WORRY_BOX_NOTIFICATION_KEY
    );

    if (existingNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        existingNotificationId
      );
    }

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const recentWorries = worryEntries.filter(
      (entry) => new Date(entry.date) >= sevenDaysAgo
    );

    if (recentWorries.length > 0) {
      return; // Skip scheduling
    }

    const recentDiaryEntries = diaryEntries.filter(
      (entry) => new Date(entry.date) >= sevenDaysAgo
    );

    if (recentDiaryEntries.length === 0) {
      return; // Skip due to no data to calculate average
    }

    const totalAnxiety = recentDiaryEntries.reduce(
      (sum, entry) => sum + entry.sliderValues[1],
      0
    );

    const averageAnxiety = totalAnxiety / recentDiaryEntries.length;

    if (averageAnxiety < 7) {
      return; // Only schedule if average is 7 or more
    }

    const triggerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      20,
      30,
      0
    );

    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Iets dat je bezighoudt?',
        body: 'Schrijf het van je af in het Zorgenbakje en geef jezelf wat ruimte.',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          route: {
            screen: 'Toolkit',
            params: {
              screen: 'WorryBox',
            },
          },
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        year: triggerDate.getFullYear(),
        month: triggerDate.getMonth() + 1,
        day: triggerDate.getDate(),
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
      },
    });

    await AsyncStorage.setItem(WORRY_BOX_NOTIFICATION_KEY, newNotificationId);
    console.log('WORRY_BOX_NOTIFICATION_KEY', newNotificationId);
  };

  const scheduleExerciseInactivityNotification = async () => {
    const existingNotificationId = await AsyncStorage.getItem(
      EXERCISES_NOTIFICATION_KEY
    );

    if (existingNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        existingNotificationId
      );
    }

    const now = new Date();
    const triggerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 7,
      20, // 20:30
      30,
      0
    );

    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Toe aan ontspanning?',
        body: 'Zet alles even op pauze en doe een oefening die je hierbij helpt.',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          route: {
            screen: 'Toolkit',
            params: {
              screen: 'Exercises',
            },
          },
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        year: triggerDate.getFullYear(),
        month: triggerDate.getMonth() + 1,
        day: triggerDate.getDate(),
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
      },
    });

    await AsyncStorage.setItem(EXERCISES_NOTIFICATION_KEY, newNotificationId);
    console.log('EXERCISES_NOTIFICATION_KEY', newNotificationId);
  };

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notification,
        error,
        scheduleDailyNotification,
        scheduleEvery3DaysNotification,
        scheduleReminder3DaysNotification,
        scheduleDashboardInactivityNotification,
        scheduleReminderWorryBoxNotification,
        scheduleExerciseInactivityNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
