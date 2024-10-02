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
    <Pressable
      onPress={() => navigation.navigate('NotesToSelf3', { item })}
      style={styles.container}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 15,
        }}
      >
        {getCategory(category)}
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <FontAwesome5 name='chevron-right' size={24} color='#5C6B57' />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C1D6BA',
    borderRadius: 20,
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
  },
  titleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
});
