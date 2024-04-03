import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { Header } from '../components/Header';
import { Performance } from '../components/Performance';

export const DashboardScreen: React.FC = () => {
  return (
    <>
      <StatusBar />
      <ScrollView
        // Apply layout styles here
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}
        // Add any additional styles here if needed
        style={{ flex: 1 }}
      >
        <Header />
        <Performance />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  performanceTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  performanceDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
});
