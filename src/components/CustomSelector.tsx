import {
  View,
  Text,
  Platform,
  TextStyle,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Fonts } from '../styles';

enum SelectOptions {
  Week,
  Maand,
  Jaar,
}
export const CustomSelector: React.FC<{
  selected: SelectOptions;
  handleSelect: (option: SelectOptions) => void;
}> = ({ selected, handleSelect }) => {
  return (
    <View>
      <View style={styles.container}>
        <Pressable
          style={[
            selected === 0 ? styles.selectedButton : styles.unselectedButton,
            styles.leftButton,
          ]}
          onPress={() => handleSelect(SelectOptions.Week)}
        >
          <Text
            style={selected === 0 ? styles.selectedText : styles.unselectedText}
          >
            Week
          </Text>
        </Pressable>
        <Pressable
          style={
            selected === 1 ? styles.selectedButton : styles.unselectedButton
          }
          onPress={() => handleSelect(SelectOptions.Maand)}
        >
          <Text
            style={selected === 1 ? styles.selectedText : styles.unselectedText}
          >
            Maand
          </Text>
        </Pressable>
        <Pressable
          style={[
            selected === 2 ? styles.selectedButton : styles.unselectedButton,
            styles.rightButton,
          ]}
          onPress={() => handleSelect(SelectOptions.Jaar)}
        >
          <Text
            style={selected === 2 ? styles.selectedText : styles.unselectedText}
          >
            Jaar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#f6f6f6',
  },
  unselectedButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  selectedButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9C1A1',
    paddingVertical: 5,
  },
  leftButton: {
    borderRadius: 5,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  rightButton: {
    borderRadius: 5,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  unselectedText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  selectedText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
});
