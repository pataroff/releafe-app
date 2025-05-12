import { ImageSourcePropType } from 'react-native';
import { Gender } from '../types';

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

export const settingsData = [
  { heading: 'Profiel instellingen', data: profileSettingsData },
];

export const getGenderString = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return 'Man';
    case Gender.Female:
      return 'Vrouw';
    case Gender.Other:
      return 'Anders';
  }
};
