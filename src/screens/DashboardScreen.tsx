import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { Performance } from '../components/Performance';

export const DashboardScreen: React.FC = () => {
  const title = 'Welzijnsoverzicht';

  return (
    <>
      <StatusBar />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Header title={title} />
        <Performance />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
  },
});
