import {
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TextStyle,
  Platform,
} from 'react-native';
import { Fonts } from '../styles';

export const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  onPress,
  editable = true,
}: {
  label: string;
  value: string;
  onChangeText?: (val: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  onPress?: () => void;
  editable?: boolean;
}) => (
  <>
    <Text style={styles.textInputLabelText}>{label}</Text>
    <Pressable onPress={onPress} disabled={!onPress}>
      <TextInput
        style={[styles.textInputField]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize='none'
        editable={editable}
        pointerEvents={editable ? 'auto' : 'none'}
      />
    </Pressable>
  </>
);

const styles = StyleSheet.create({
  textInputLabelText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  textInputField: {
    ...Fonts.sofiaProItalic[Platform.OS],
    verticalAlign: Platform.OS == 'android' ? 'top' : {},
    height: 40,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 15,
  } as TextStyle,
});
