import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { ImageSourcePropType } from 'react-native';

import { AuthModel, RecordModel } from 'pocketbase';

export interface ISettingsContext {
  favouriteExercises: string[];
  setFavouriteExercises: (exercises: string[]) => void;
  updateFavouritesInDatabase: (exercises: string[]) => Promise<void>;
}

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

export enum Gender {
  Male = 'MAN',
  Female = 'VROUW',
  Other = 'ANDERS',
}

export interface IUserData {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  gender: Gender | null;
  postcode: string;
}

export interface IAuthContext {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  register: ({}: IUserData) => void;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<void>;
  changeEmail: (newEmail: string) => Promise<void>;
  changeBirthDate: (newBirthDate: Date) => Promise<void>;
  updateUser: (updatedFields: Partial<IUserData>) => Promise<void>;
  deleteUser: (password: string) => Promise<void>;
  isLoading: boolean;
  isLoggedIn: boolean;
  user: AuthModel | null;
}

export enum ChartTimeframe {
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY',
}

export enum Category {
  Work = 'WORK',
  Health = 'HEALTH',
  Relationships = 'RELATIONSHIPS',
  Education = 'EDUCATION',
  Finance = 'FINANCE',
  Other = 'OTHER',
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

export enum ExerciseCategory {
  Mindfulness = 'MINDFULNESS',
  Meditatie = 'MEDITATIE',
  Ontspanning = 'ONTSPANNING',
  Lichaamsbeweging = 'LICHAAMSBEWEGING',
  Ademhaling = 'ADEMHALING',
}

export interface Exercise {
  id: string;
  icon: ImageSourcePropType;
  title: string;
  description: string;
  duration: string;
  link: string;
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
  diarySentence: string;
  timeframe: Timeframe;
  targetFrequency: number;
  startDate: Date | null;
  endDate: Date | null;
  lastCompletedAt: Date | null;
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
  diarySentence: string;
  timeframe: Timeframe;
  targetFrequency: number;
  startDate: Date | null;
  endDate: Date | null;
  lastCompletedAt: Date | null;
  completedTimeframe: number;
  completedPeriod: number;
  setGoalEntries: React.Dispatch<React.SetStateAction<IGoalEntry[]>>;
  setUuid: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<GoalCategory>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
  setDiarySentence: React.Dispatch<React.SetStateAction<string>>;
  setTimeframe: React.Dispatch<React.SetStateAction<Timeframe>>;
  setTargetFrequency: React.Dispatch<React.SetStateAction<number>>;
  setCompletedTimeframe: React.Dispatch<React.SetStateAction<number>>;
  setCompletedPeriod: React.Dispatch<React.SetStateAction<number>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setLastCompletedAt: React.Dispatch<React.SetStateAction<Date | null>>;
  createGoalEntry: () => void;
  updateGoalEntry: (uuid: string) => void;
  deleteGoalEntry: (uuid: string) => void;
  refreshGoalTimeframes: () => void;
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
    description: string,
    reframed?: boolean
  ) => void;
  resetWorryEntryFields: () => void;
}

export type MediaFile = {
  uri: string;
  type: string;
  name: string;
};

// @TODO: What about the slider values?
export interface INoteEntry {
  id: string;
  uuid: string;
  category: Category;
  priority: Priority;
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
  mediaFile: MediaFile;
  audioMetering: number[];
}

export interface INoteContext {
  noteEntries: INoteEntry[];
  uuid: string;
  feelingDescription: string;
  thoughtLikelihoodSliderOne: number;
  forThoughtEvidence: string;
  againstThoughtEvidence: string;
  friendAdvice: string;
  thoughtLikelihoodSliderTwo: number;
  thoughtLikelihood: string;
  alternativePerspective: string;
  mediaFile: MediaFile;
  audioMetering: number[];
  setNoteEntries: React.Dispatch<React.SetStateAction<INoteEntry[]>>;
  setUuid: React.Dispatch<React.SetStateAction<string>>;
  setFeelingDescription: React.Dispatch<React.SetStateAction<string>>;
  setThoughtLikelihoodSliderOne: React.Dispatch<React.SetStateAction<number>>;
  setForThoughtEvidence: React.Dispatch<React.SetStateAction<string>>;
  setAgainstThoughtEvidence: React.Dispatch<React.SetStateAction<string>>;
  setFriendAdvice: React.Dispatch<React.SetStateAction<string>>;
  setThoughtLikelihoodSliderTwo: React.Dispatch<React.SetStateAction<number>>;
  setThoughtLikelihood: React.Dispatch<React.SetStateAction<string>>;
  setAlternativePerspective: React.Dispatch<React.SetStateAction<string>>;
  setMediaFile: React.Dispatch<React.SetStateAction<MediaFile>>;
  setAudioMetering: React.Dispatch<React.SetStateAction<number[]>>;
  createNoteEntry: (worryEntryUuid?: string) => void;
  deleteNoteEntry: (uuid: string) => void;
  updateNoteEntryFields: (
    uuid: string,
    feelingDescription: string,
    thoughtLikelihoodSliderOne: number,
    forThoughtEvidence: string,
    againstThoughtEvidence: string,
    friendAdvice: string,
    thoughtLikelihoodSliderTwo: number,
    thoughtLikelihood: string,
    alternativePerspective: string,
    mediaFile: MediaFile
  ) => void;
  resetNoteEntryFields: () => void;
}

export type Achievement = {
  id: string;
  icon: ImageSourcePropType;
  points: number;
  description: string;
};

export type AchievementGroup = {
  title: string;
  description: string;
  achievements: Achievement[];
};

export type SelectedAchievement = Achievement & { parentTitle: string };
