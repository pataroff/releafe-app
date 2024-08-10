import { ScrollView, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { LoginForm } from '../components/LoginForm';

export const LoginScreen = () => {
  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Image
          style={{ width: '90%', height: 100, marginBottom: 20 }}
          source={require('../../assets/images/logo_releafe_02.png')}
        />
        <LoginForm />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
