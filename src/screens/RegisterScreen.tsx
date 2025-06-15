import { ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { RegisterForm } from '../components/RegisterForm';

const windowWidth = Dimensions.get('window').width;

export const RegisterScreen = () => {
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
        <RegisterForm />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyles: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    paddingHorizontal: 25,
    paddingVertical: 80,
  },
  logoImage: {
    paddingHorizontal: 15,
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
  },
});
