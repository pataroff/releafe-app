import { Fonts, Typography } from '../styles';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from 'react-native-paper';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const windowHeight = Dimensions.get('window').height;

export const Header = ({ title }) => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View>
            <Avatar.Text
              style={{ backgroundColor: '#C1D6BA' }}
              color='black'
              size={56}
              label={user?.firstName[0] + user?.lastName[0]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 125,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderTopWidth: 0,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    borderWidth: 1,
    borderColor: '#dedede',
    backgroundColor: 'white',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    columnGap: 30,
    width: '100%',
  },
  headerTitle: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
    textAlign: 'left',
  } as TextStyle,
});
