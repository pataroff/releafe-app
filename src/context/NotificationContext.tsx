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
import { IDiaryEntry, IGoalEntry, IWorryEntry } from '../types';

import { useDiary } from './DiaryContext';
import { useWorry } from './WorryContext';
import { useGoal } from './GoalContext';

import {
  evaluateScheduleNotification,
  shouldRemindDashboardInactivity,
  shouldRemindExercisesInactivity,
  shouldRemindWorryBox
} from '../utils/notifications';

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
  scheduleReminder3DaysNotification: (
    goalEntries: IGoalEntry[]
  ) => Promise<void>;
  scheduleDashboardInactivityNotification: () => Promise<void>;
  scheduleReminderWorryBoxNotification: (
    worryEntries: IWorryEntry[],
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
const EXERCISES_INACTIVITY_NOTIFICATION_KEY =
  'EXERCISES_INACTIVITY_NOTIFICATION_ID';

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

  const { diaryEntries } = useDiary();
  const { goalEntries } = useGoal();
  const { worryEntries } = useWorry();

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

  useEffect(() => {
    (async () => {
      // @TODO Refactor, remove the trigger from `evaluateScheduleNotificaiton` and put it inside the called function!
      // Notification 1: daily notifications
      scheduleDailyNotification(
          '20:30',
          'Hoe gaat het vandaag met je?',
          'Neem even de tijd om je dagboek in te vullen – even stilstaan bij hoe het gaat.',
          {screen: 'Diary', params: {screen: 'Diary1'}}
      );

      // Notification 2: every 3 days
      evaluateScheduleNotification(
          goalEntries.length <= 0,
          PERSONAL_GOALS_NOTIFICATION_KEY,
          scheduleEvery3DaysNotification
      );

      // Notification 3: before weekly/monthly deadline
      evaluateScheduleNotification(
          goalEntries.some(g => g.timeframe === 'WEEKLY' || g.timeframe === 'MONTHLY'),
          PERSONAL_GOALS_DEADLINE_NOTIFICATION_KEY,
          () => scheduleReminder3DaysNotification(goalEntries)
      );

      // Notification 4: dashboard inactivity
      const dashboardInactivityTrigger = await shouldRemindDashboardInactivity();
      evaluateScheduleNotification(
          dashboardInactivityTrigger,
          DASHBOARD_INACTIVITY_NOTIFICATION_KEY,
          scheduleDashboardInactivityNotification
      );

      // Notification 5
      await evaluateScheduleNotification(
          shouldRemindWorryBox(worryEntries, diaryEntries),
          WORRY_BOX_NOTIFICATION_KEY,
          () => scheduleReminderWorryBoxNotification(worryEntries, diaryEntries)
      );

      // Notification 6: exercises inactivity
      const exercisesInactivityTrigger = await shouldRemindExercisesInactivity()
      evaluateScheduleNotification(
          exercisesInactivityTrigger,
          EXERCISES_INACTIVITY_NOTIFICATION_KEY,
          scheduleExerciseInactivityNotification
      );
    })();
  }, [diaryEntries, goalEntries, worryEntries]);

  const scheduleDailyNotification = async (
    time: string,
    title: string,
    body: string,
    route?: string | {}
  ) => {
    const existingNotificationId = await AsyncStorage.getItem(
      DIARY_NOTIFICATION_KEY
    );

    let isStillScheduled = false;
    if (existingNotificationId) {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      isStillScheduled = scheduled.some((n) => n.identifier === existingNotificationId);
      if (isStillScheduled) return;
      // Cancel previous daily notification if it exists
      await AsyncStorage.removeItem(DIARY_NOTIFICATION_KEY);
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
  };

  const scheduleEvery3DaysNotification = async () => {
    // Calculate the next 16:00 time 3 days from now
    const now = new Date();
    const triggerDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 3,
        16, 0, 0, 0
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
        repeats: false,
        hour: 16,
        minute: 0,
        day: triggerDate.getDate(),
        month: triggerDate.getMonth() + 1, // Expo Notifications months start from index 1, therefore we have to add 1!
        year: triggerDate.getFullYear(),
      },
    });

    await AsyncStorage.setItem(
      PERSONAL_GOALS_NOTIFICATION_KEY,
      newNotificationId
    );
  };

  const scheduleReminder3DaysNotification = async (
    goalEntries: IGoalEntry[]
  ) => {
    const eligibleGoals = goalEntries.filter(
      (goal) => goal.timeframe === 'WEEKLY' || goal.timeframe === 'MONTHLY'
    );

    if (eligibleGoals.length === 0) return;

    const soonest = eligibleGoals.reduce((earliest, current) => {
      const a = new Date(earliest.endDate!);
      const b = new Date(current.endDate!);
      return a < b ? earliest : current;
    });

    const deadline = new Date(soonest.endDate!);
    deadline.setDate(deadline.getDate() - 3);
    deadline.setHours(10, 0, 0, 0);

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
        month: deadline.getMonth() + 1,
        day: deadline.getDate(),
        hour: deadline.getHours(),
        minute: deadline.getMinutes(),
      },
    });

    await AsyncStorage.setItem(
      PERSONAL_GOALS_DEADLINE_NOTIFICATION_KEY,
      newNotificationId
    );
  };

  const scheduleDashboardInactivityNotification = async () => {
    const now = new Date();
    const triggerDate = new Date();
    triggerDate.setHours(15, 0, 0, 0); // Today at 15:00

    if (triggerDate.getTime() <= now.getTime()) {
      triggerDate.setDate(triggerDate.getDate() + 1); // Schedule for tomorrow
    }

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
  };

  const scheduleReminderWorryBoxNotification = async (
    worryEntries: IWorryEntry[],
    diaryEntries: IDiaryEntry[]
  ) => {
    const now = new Date();
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
  };

  const scheduleExerciseInactivityNotification = async () => {
    const now = new Date();
    const triggerDate = new Date();
    triggerDate.setHours(20, 30, 0, 0);

    if (triggerDate.getTime() <= now.getTime()) {
      triggerDate.setDate(triggerDate.getDate() + 1); // Schedule for tomorrow
    }

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

    await AsyncStorage.setItem(
      EXERCISES_INACTIVITY_NOTIFICATION_KEY,
      newNotificationId
    );
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
