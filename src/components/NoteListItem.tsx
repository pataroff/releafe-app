import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { Category, INoteEntry } from '../types';

import { useNavigation } from '@react-navigation/native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome6';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const getCategory = (category: Category): React.ReactElement => {
  switch (category) {
    case Category.Work:
      return <FontAwesome6 name='suitcase' size={28} color='black' />;
    case Category.Health:
      return <FontAwesome5 name='plus' size={28} color='black' />;
    case Category.Relationships:
      return <FontAwesome name='heart' size={28} color='black' />;
  }
};

export const NoteListItem: React.FC<{ item: INoteEntry }> = ({ item }) => {
  const navigation = useNavigation();
  const { title, category } = item;

  return (
    <Pressable onPress={() => navigation.navigate('NotesToSelf2', { item })}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        {getCategory(category)}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 70,
    width: '100%',
    paddingHorizontal: 20,
  },
  titleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
});
