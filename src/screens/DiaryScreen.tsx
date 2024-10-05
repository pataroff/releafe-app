import { StyleSheet, ScrollView } from 'react-native';

import { DiaryGreeting } from '../components/DiaryGreeting';

export const DiaryScreen: React.FC = () => {
  return (
    <>
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <DiaryGreeting />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
});
