import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { AuthModel } from 'pocketbase';

export interface IDiaryEntry {
  id: string;
  uuid: string;
  date: Date;
  sliderValues: Map<number, number | string>;
  textValues: Map<number, number | string>;
}

export interface IDiaryContext {
  diaryEntries: IDiaryEntry[];
  sliderValues: Map<number, number>;
  sliderQuestionIndex: number;
  progressValue: number;
  hasData: boolean;
  date: Date;
  setDiaryEntries: React.Dispatch<React.SetStateAction<IDiaryEntry[]>>;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setProgressValue: React.Dispatch<React.SetStateAction<number>>;
  setSliderQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  addSliderValue: (questionIndex: number, value: number) => void;
  resetSliderValues: () => void;
  resetTextValues: () => void;
  addTextValue: (questionIndex: number, value: string) => void;
  createDiaryEntry: () => void;
  jsonToMap: (data: {
    [key: string]: number | string;
  }) => Map<number, number | string>;
}

export type RootStackParamList = {
  Home: undefined;
  Diary: undefined;
  Toolkit: undefined;
  Chat: undefined;
};

export interface IUserData {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export interface IAuthContext {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  register: ({}: IUserData) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  user: AuthModel | null;
}

export enum Category {
  Work = 'WORK',
  Health = 'HEALTH',
  Relationships = 'RELATIONSHIPS',
}

export enum Priority {
  None = 'NONE',
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export interface IWorryListItem {
  id: string;
  category: Category;
  priority: Priority;
  date: Date;
  title: string;
  description: string;
  reframed: boolean;
}

export interface IWorryContext {
  worryEntries: IWorryListItem[];
  category: Category;
  priority: Priority;
  date: Date;
  title: string;
  description: string;
  reframed: boolean;
  setWorryEntries: React.Dispatch<React.SetStateAction<IWorryListItem[]>>;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  setPriority: React.Dispatch<React.SetStateAction<Priority>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setReframed: React.Dispatch<React.SetStateAction<boolean>>;
  createWorryEntry: () => void;
  resetWorryEntryFields: () => void;
}
