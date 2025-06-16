import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';

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
        <View style={styles.logoContainer}>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode='contain'
            source={require('../../assets/images/logo_releafe_04.png')}
          />
        </View>
        <LoginForm />
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
    borderWidth: 1,
    width: windowWidth,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
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
