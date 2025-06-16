import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';

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
        <View style={styles.logoContainer}>
          <Image
            resizeMode='contain'
            style={{ width: '100%', height: '100%' }}
            source={require('../../assets/images/logo_releafe_04.png')}
          />
        </View>
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
