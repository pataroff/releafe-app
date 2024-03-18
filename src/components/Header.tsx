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

const windowWidth = Dimensions.get('window').width;

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Dagboek & {'\n'}Persoonlijk dashboard
        </Text>
        <View>
          <Avatar.Text size={64} label='JG' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: 200,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  headerContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 30,
  },
  headerTitle: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
    textAlign: 'left',
  } as TextStyle,
});
