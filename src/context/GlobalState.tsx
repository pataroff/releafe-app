import React, { createContext, useReducer } from 'react';
import { IDiaryEntry, IState, IStore } from '../types';
import AppReducer from './AppReducer';

// Initial state
const initialState: IState = {
  diaryEntries: [],
};

// Create context
export const GlobalContext = createContext<IStore>({
  state: initialState,
  addDiaryEntry: () => {},
  deleteDiaryEntry: () => {},
});

// Provider component
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function addDiaryEntry(diaryEntry: IDiaryEntry) {
    console.log('Action called!');
    dispatch({
      type: 'ADD_DIARY_ENTRY',
      payload: diaryEntry,
    });
  }

  function deleteDiaryEntry(id: string) {
    dispatch({
      type: 'DELETE_DIARY_ENTRY',
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider value={{ state, addDiaryEntry, deleteDiaryEntry }}>
      {children}
    </GlobalContext.Provider>
  );
};
