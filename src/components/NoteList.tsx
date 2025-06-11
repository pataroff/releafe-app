import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { NoteListItem } from './NoteListItem';

import { useNote } from '../context/NoteContext';
import { INoteEntry } from '../types';

interface NoteListProps {
  route: any;
  setSelectedNote: React.Dispatch<React.SetStateAction<INoteEntry | null>>;
  modalNoteListItemExpandedVisible: boolean;
  setModalNoteListItemExpandedVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const windowWidth = Dimensions.get('window').width;

export const NoteList: React.FC<NoteListProps> = ({
  route,
  setSelectedNote,
  modalNoteListItemExpandedVisible,
  setModalNoteListItemExpandedVisible,
}) => {
  const { noteEntries } = useNote();

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.noteListContainer}
        contentContainerStyle={styles.noteListContentContainer}
      >
        {noteEntries.length > 0 ? (
          noteEntries.map((note) => {
            return (
              <NoteListItem
                route={route}
                key={note.uuid}
                note={note}
                setSelectedNote={setSelectedNote}
                modalNoteListItemExpandedVisible={
                  modalNoteListItemExpandedVisible
                }
                setModalNoteListItemExpandedVisible={
                  setModalNoteListItemExpandedVisible
                }
              />
            );
          })
        ) : (
          <>
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataTitleText}>Geen berichten</Text>
              <Text style={styles.noDataDescriptionText}>
                Je hebt op dit moment geen opgeslagen berichten.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  noteListContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  noteListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    rowGap: 10,
    width: windowWidth - 2 * 25,
    paddingBottom: 100,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  noDataTitleText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
});
