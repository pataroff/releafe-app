import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export interface IDiaryEntry {
  id: string;
  createdAt: Date;
  sliderValues: Map<number, number>;
  textValues: Map<number, string>;
}

export interface IDiaryContext {
  diaryEntries: IDiaryEntry[];
  sliderValues: Map<number, number>;
  sliderQuestionIndex: number;
  progressValue: number;
  hasData: boolean;
  createdAt: Date;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedAt: React.Dispatch<React.SetStateAction<Date>>;
  setProgressValue: React.Dispatch<React.SetStateAction<number>>;
  setSliderQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  addSliderValue: (questionIndex: number, value: number) => void;
  resetSliderValues: () => void;
  resetTextValues: () => void;
  addTextValue: (questionIndex: number, value: string) => void;
  createDiaryEntry: () => void;
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
