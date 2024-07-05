import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ScrollView } from 'react-native'

import { Header } from '../components/Header'
import { DiaryFarewell } from '../components/DiaryFarewell'

export const DiaryScreen4: React.FC = () => {
  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Header />
        <DiaryFarewell />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
})
