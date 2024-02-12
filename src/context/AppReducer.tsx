import { IDiaryEntry, IState, IAction } from '../types';

export default (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_DIARY_ENTRY':
      return {
        ...state,
        transactions: [action.payload, ...state.diaryEntries],
      };
    case 'DELETE_DIARY_ENTRY':
      return {
        ...state,
        transactions: state.diaryEntries.filter(
          (diaryEntry: IDiaryEntry) => diaryEntry.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
