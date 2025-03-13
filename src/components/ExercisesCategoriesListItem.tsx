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

import { useNavigation } from '@react-navigation/native';

import { getExerciseCategoryIcon } from '../utils/exercises';

export const ExercisesCategoriesListItem: React.FC<{
  categoryItem: { title: string; description: string };
  index: number;
}> = ({ categoryItem, index }) => {
  const navigation = useNavigation();

  const { title, description } = categoryItem;

  const handleExercisesCategorySelection = () => {
    //@ts-expect-error
    navigation.navigate('Exercises2', {
      category: title,
      description: description,
    });
  };

  return (
    <Pressable
      onPress={() => handleExercisesCategorySelection()}
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
        {index !== 0 && (
          <Image
            source={getExerciseCategoryIcon(index)}
            style={{ width: 35, height: 35 }}
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
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
