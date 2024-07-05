import { Fonts, Typography } from '../styles'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TextStyle,
} from 'react-native'

import { Avatar } from 'react-native-paper'

const windowHeight = Dimensions.get('window').height

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Dagboek & {'\n'}Persoonlijk dashboard
        </Text>
        <View>
          <Avatar.Text size={56} label='JG' />
        </View>
      </View>
    </View>
  )
}

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
})
