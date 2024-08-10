import { Fonts, Typography } from '../styles';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TextStyle,
} from 'react-native';

import { Avatar } from 'react-native-paper';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const windowHeight = Dimensions.get('window').height;

export const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Dagboek & {'\n'}Persoonlijk dashboard
        </Text>
        <View>
          <Avatar.Text
            style={{ backgroundColor: '#00d8bd' }}
            color='white'
            size={56}
            label={user.firstName[0] + user.lastName[0]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    height: 125,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderTopWidth: 0,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
