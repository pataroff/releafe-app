import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export interface IDiaryEntry {
  id: string;
  sliderValues: Map<number, number>;
  textValues: Map<number, string>;
}

export interface IDiaryContext {
  diaryEntries: IDiaryEntry[];
  addSliderValue: (questionIndex: number, value: number) => void;
  addTextValue: (questionIndex: number, value: string) => void;
  createDiaryEntry: () => void;
}

export type RootStackParamList = {
  Home: undefined;
  Diary: undefined;
  Toolkit: undefined;
  Chat: undefined;
};
