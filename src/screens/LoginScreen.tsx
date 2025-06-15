import { ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { LoginForm } from '../components/LoginForm';

const windowWidth = Dimensions.get('window').width;

export const LoginScreen = () => {
  return (
    <>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Image
          resizeMode='contain'
          style={styles.logoImage}
          source={require('../../assets/images/logo_releafe_04.png')}
        />
        <LoginForm />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  contentContainerStyles: {
    flexGrow: 1,
    borderWidth: 1,
    width: windowWidth,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    paddingHorizontal: 15,
    height: 100,
    width: '100%',
    marginBottom: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
  },
});
