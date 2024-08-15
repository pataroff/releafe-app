import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export interface IDiaryEntry {
  id: string;
  date: Date;
  sliderValues: Map<number, number>;
  textValues: Map<number, string>;
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
  jsonToMap: (jsonStr: string) => Map<number, number | string>;
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

export enum Category {
  Work,
  Health,
  Relationships,
}

export enum Priority {
  None,
  Low,
  Medium,
  High,
}

export interface IWorriesListItem {
  id: string;
  category: Category;
  priority: Priority;
  date: Date;
  title: string;
  description: string;
  reframed: boolean;
}
