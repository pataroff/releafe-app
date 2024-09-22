import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextStyle,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts } from '../styles';

import { Avatar } from 'react-native-paper';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Header = ({ title }) => {
  const insets = useSafeAreaInsets();

  const { user, signOut } = useContext(AuthContext);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          {/* TODO: Change this to a <View> component! */}
          <Pressable onPress={() => signOut()}>
            <Avatar.Text
              style={{ backgroundColor: '#C1D6BA' }}
              color='white'
              size={56}
              label={user?.firstName[0] + user?.lastName[0]}
            />
          </Pressable>
        </View>
      </View>
    </View>
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
