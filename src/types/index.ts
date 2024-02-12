export interface IDiaryEntry {
  id: string;
  type: string;
  title: string;
  body: string;
}

export interface IState {
  diaryEntries: IDiaryEntry[];
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IStore {
  state: IState;
  addDiaryEntry(diaryEntry: IDiaryEntry): void;
  deleteDiaryEntry(id: string): void;
}
