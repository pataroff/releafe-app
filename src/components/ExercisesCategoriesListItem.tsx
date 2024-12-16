import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import Entypo from '@expo/vector-icons/Entypo';

export const ExercisesCategoriesListItem: React.FC<{
  item;
  index: number;
}> = ({ item, index }) => {
  const { icon, title } = item;

  return (
    <Pressable
      onPress={() => console.log(`${title} category pressed!`)}
      style={
        index == 0
          ? [styles.container, { backgroundColor: '#C1D6BA' }]
          : styles.container
      }
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 15,
        }}
      >
        {icon !== null && (
          <Image
            source={icon}
            style={{ width: 40, height: 40 }}
            resizeMode='contain'
          />
        )}
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <Entypo name='chevron-right' size={32} color='#5C6B57' />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E5F1E3',
    borderRadius: 20,
    height: 60,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 10,
  },
  titleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
