import { ImageSourcePropType } from 'react-native';

type ToggleKey = 'notifications' | 'gamification';

type SettingsData = {
  icon: ImageSourcePropType;
  title: string;
  isToggle?: boolean;
  key?: ToggleKey;
};

export const profileSettingsData: SettingsData[] = [
  {
    icon: require('../../assets/images/settings_icons/password_icon.png'),
    title: 'Wachtwoord wijzigen',
  },
  {
    icon: require('../../assets/images/settings_icons/email_icon.png'),
    title: 'E-mailadres bijwerken',
  },
  {
    icon: require('../../assets/images/settings_icons/phone_icon.png'),
    title: 'Telefoonnummer wijzigen',
  },
  {
    icon: require('../../assets/images/settings_icons/settings_icon.png'),
    title: 'Extra profielinstellingen',
  },
];

export const extraProfileSettingsData: SettingsData[] = [
  {
    icon: require('../../assets/images/settings_icons/date_icon.png'),
    title: 'Geboortedatum wijzigen',
  },
  {
    icon: require('../../assets/images/settings_icons/download_icon.png'),
    title: 'Download uw informatie',
  },
  {
    icon: require('../../assets/images/settings_icons/delete_icon.png'),
    title: 'Profiel verwijderen',
  },
];

export const notificationsSettinsData: SettingsData[] = [
  {
    icon: require('../../assets/images/settings_icons/notifications_icon.png'),
    title: 'Pushmeldingen',
    isToggle: true,
    key: 'notifications',
  },
  {
    icon: require('../../assets/images/settings_icons/settings_icon.png'),
    title: 'Extra voorkeuren',
  },
];

export const appSettingsData: SettingsData[] = [
  {
    icon: require('../../assets/images/settings_icons/language_icon.png'),
    title: 'Taal',
  },
  {
    icon: require('../../assets/images/settings_icons/theme_icon.png'),
    title: 'Thema',
  },
  {
    icon: require('../../assets/images/settings_icons/accessibility_icon.png'),
    title: 'Lettergrotte en opmaak',
  },
  {
    icon: require('../../assets/images/settings_icons/gamification_icon.png'),
    title: 'Bonsai',
    isToggle: true,
    key: 'gamification',
  },
];

export const settingsData = [
  { heading: 'Profiel instellingen', data: profileSettingsData },
  { heading: 'Meldingen', data: notificationsSettinsData },
  { heading: 'App-instellingen', data: appSettingsData },
];
