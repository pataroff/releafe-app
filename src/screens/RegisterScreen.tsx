import { ScrollView, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { RegisterForm } from '../components/RegisterForm';

export const RegisterScreen = () => {
  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Image
          style={{ width: '90%', height: 100, marginTop: 60 }}
          source={require('../../assets/images/logo_releafe_04.png')}
        />
        <RegisterForm />
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
