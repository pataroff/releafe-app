import { IDiaryEntry, IState, IAction } from '../types';

export default (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_DIARY_ENTRY':
      return {
        ...state,
        diaryEntries: [action.payload, ...state.diaryEntries],
      };
    case 'DELETE_DIARY_ENTRY':
      return {
        ...state,
        diaryEntries: state.diaryEntries.filter(
          (diaryEntry: IDiaryEntry) => diaryEntry.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
