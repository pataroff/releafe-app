import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { AuthModel } from 'pocketbase';

export interface IDiaryEntry {
  id: string;
  uuid: string;
  date: Date;
  sliderValues: Record<number, number>;
  textValues: Record<number, string>;
}

export interface IDiaryContext {
  diaryEntries: IDiaryEntry[];
  sliderValues: Record<number, number>;
  textValues: Record<number, string>;
  hasData: boolean;
  date: Date;
  setDiaryEntries: React.Dispatch<React.SetStateAction<IDiaryEntry[]>>;
  setTextValues: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  addTextValue: (questionIndex: number, value: string) => void;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  addSliderValue: (questionIndex: number, value: number) => void;
  resetSliderValues: () => void;
  resetTextValues: () => void;
  createDiaryEntry: () => void;
  serializeRecord: (record: Record<number, number | string>) => string;
  deserializeRecord: (data: {
    [key: string]: number | string;
  }) => Record<number, number | string>;
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
  Releafe = 'RELEAFE',
  Bewegen = 'BEWEGEN',
  Slapen = 'SLAPEN',
  Voeding = 'VOEDING',
  AlcoholDrugsCafeine = 'ALCOHOL_DRUGS_CAFEINE',
  Ontspanning = 'ONTSPANNING',
  ErvaringenDelen = 'ERVARINGEN_DELEN',
  Ondernemen = 'ONDERNEMEN',
}

export enum Timeframe {
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
}

export interface IGoalEntry {
  id: string;
  uuid: string;
  category: GoalCategory;
  title: string;
  description: string;
  sentence: string;
  timeframe: Timeframe;
  targetFrequency: number;
  startDate: Date | null;
  endDate: Date | null;
  completedTimeframe: number;
  completedPeriod: number;
}

export interface IGoalContext {
  goalEntries: IGoalEntry[];
  uuid: string;
  category: GoalCategory;
  title: string;
  description: string;
  sentence: string;
  timeframe: Timeframe;
  targetFrequency: number;
  startDate: Date | null;
  endDate: Date | null;
  completedTimeframe: number;
  completedPeriod: number;
  setGoalEntries: React.Dispatch<React.SetStateAction<IGoalEntry[]>>;
  setUuid: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<GoalCategory>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
  setTimeframe: React.Dispatch<React.SetStateAction<Timeframe>>;
  setTargetFrequency: React.Dispatch<React.SetStateAction<number>>;
  setCompletedTimeframe: React.Dispatch<React.SetStateAction<number>>;
  setCompletedPeriod: React.Dispatch<React.SetStateAction<number>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  createGoalEntry: () => void;
  updateGoalEntry: (uuid: string) => void;
  deleteGoalEntry: (uuid: string) => void;
  resetGoalEntryFields: () => void;
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
