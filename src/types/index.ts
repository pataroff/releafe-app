import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { AuthModel } from 'pocketbase';

export interface IDiaryEntry {
  id: string;
  uuid: string;
  date: Date;
  sliderValues: Map<number, number>;
  textValues: Map<number, string>;
}

export interface IDiaryContext {
  diaryEntries: IDiaryEntry[];
  sliderValues: Map<number, number>;
  sliderQuestionIndex: number;
  progressValue: number;
  textValues: Map<number, string>;
  hasData: boolean;
  date: Date;
  setDiaryEntries: React.Dispatch<React.SetStateAction<IDiaryEntry[]>>;
  setTextValues: React.Dispatch<React.SetStateAction<Map<number, string>>>;
  addTextValue: (questionIndex: number, value: string) => void;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setProgressValue: React.Dispatch<React.SetStateAction<number>>;
  setSliderQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  addSliderValue: (questionIndex: number, value: number) => void;
  resetSliderValues: () => void;
  resetTextValues: () => void;
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

export enum SelectOptions {
  Week,
  Maand,
  Jaar,
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

export enum GoalCategory {
  Bewegen = 'BEWEGEN',
  Ontspanning = 'ONTSPANNING',
  Voeding = 'VOEDING',
  Slapen = 'SLAPEN',
}

export interface IIcon {
  label: string;
  value: string;
  icon: React.ReactElement;
}

export interface IWorryListItem {
  id: string;
  uuid: string;
  category: Category;
  priority: Priority;
  date: Date;
  title: string;
  description: string;
  reframed: boolean;
}

export interface IWorryContext {
  worryEntries: IWorryListItem[];
  uuid: string;
  category: Category;
  priority: Priority;
  date: Date;
  title: string;
  description: string;
  reframed: boolean;
  setWorryEntries: React.Dispatch<React.SetStateAction<IWorryListItem[]>>;
  setUuid: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  setPriority: React.Dispatch<React.SetStateAction<Priority>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setReframed: React.Dispatch<React.SetStateAction<boolean>>;
  createWorryEntry: () => void;
  deleteWorryEntry: (uuid: string) => void;
  updateWorryEntryFields: (
    uuid: string,
    category: Category,
    priority: Priority,
    title: string,
    description: string
  ) => void;
  resetWorryEntryFields: () => void;
}

// @TODO: What about the slider values?
export interface INoteEntry {
  id: string;
  uuid: string;
  category: Category;
  title: string;
  description: string;
  feelingDescription: string;
  thoughtLikelihoodSliderOne: number;
  forThoughtEvidence: string;
  againstThoughtEvidence: string;
  friendAdvice: string;
  thoughtLikelihoodSliderTwo: number;
  thoughtLikelihood: string;
  alternativePerspective: string;
}

export interface INoteContext {
  noteEntries: INoteEntry[];
  isChecked: boolean;
  uuid: string;
  feelingDescription: string;
  thoughtLikelihoodSliderOne: number;
  forThoughtEvidence: string;
  againstThoughtEvidence: string;
  friendAdvice: string;
  thoughtLikelihoodSliderTwo: number;
  thoughtLikelihood: string;
  alternativePerspective: string;
  setNoteEntries: React.Dispatch<React.SetStateAction<INoteEntry[]>>;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setUuid: React.Dispatch<React.SetStateAction<string>>;
  setFeelingDescription: React.Dispatch<React.SetStateAction<string>>;
  setThoughtLikelihoodSliderOne: React.Dispatch<React.SetStateAction<number>>;
  setForThoughtEvidence: React.Dispatch<React.SetStateAction<string>>;
  setAgainstThoughtEvidence: React.Dispatch<React.SetStateAction<string>>;
  setFriendAdvice: React.Dispatch<React.SetStateAction<string>>;
  setThoughtLikelihoodSliderTwo: React.Dispatch<React.SetStateAction<number>>;
  setThoughtLikelihood: React.Dispatch<React.SetStateAction<string>>;
  setAlternativePerspective: React.Dispatch<React.SetStateAction<string>>;
  createNoteEntry: (worryEntryUuid?: string) => void;
  resetNoteEntryFields: () => void;
}
