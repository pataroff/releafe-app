import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Category } from '../types';

import Slider from '@react-native-community/slider';
import { MarkerProps } from '@react-native-community/slider';

const getCategory = (category: Category): React.ReactElement => {
  switch (category) {
    case Category.Work:
      return <FontAwesome6 name='suitcase' size={30} color='black' />;
    case Category.Health:
      return <FontAwesome5 name='plus' size={30} color='black' />;
    case Category.Relationships:
      return <FontAwesome name='heart' size={30} color='black' />;
  }
};

// @TODO: Correct the `route` type annotation!
export const NoteListItemExpanded: React.FC<{ route: any }> = ({ route }) => {
  const {
    category,
    title,
    description,
    feelingDescription,
    alternativePerspective,
    friendAdvice,
    againstThoughtEvidence,
    thoughtLikelihood,
    thoughtLikelihoodSliderOne,
    thoughtLikelihoodSliderTwo,
  } = route.params.item;

  const StepMarker: React.FC<MarkerProps> = ({ stepMarked }) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 6,
          borderRadius: 99,
          width: 8,
          height: 8,
          backgroundColor: stepMarked ? '#00d7bc' : '#007667',
        }}
      ></View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      contentContainerStyle={styles.mainContentContainer}
    >
      {/* Icon + Title */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 10,
        }}
      >
        {getCategory(category)}
        <Text
          style={
            {
              ...Fonts.poppinsSemiBold[Platform.OS],
              fontSize: 16,
            } as TextStyle
          }
        >
          {title}
        </Text>
      </View>

      {/* Main Content */}
      <View
        style={{
          marginTop: 10,
          width: '100%',
          rowGap: 10,
        }}
      >
        {/* Alternative Perspective Text */}
        <Text
          style={
            route.name == 'NotesToSelf2'
              ? [
                  styles.bodyText,
                  { ...(Fonts.poppinsSemiBold[Platform.OS] as TextStyle) },
                ]
              : styles.bodyText
          }
        >
          {alternativePerspective}
        </Text>

        {/* Friend Advice Text */}
        <View>
          <Text style={styles.headingText}>Advies:</Text>
          <Text style={styles.bodyText}>{friendAdvice}</Text>
        </View>

        {/* Against Thought Evidence Text */}
        <View>
          <Text style={styles.headingText}>Tegenbewijs:</Text>
          <Text style={styles.bodyText}>{againstThoughtEvidence}</Text>
        </View>

        {/* Likelihood Text */}
        <View>
          <Text style={styles.headingText}>Waarschijnlijkheid:</Text>
          <Text style={styles.bodyText}>{thoughtLikelihood}</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            disabled={true}
            minimumValue={0}
            maximumValue={4}
            step={1}
            thumbTintColor='#00d7bc'
            StepMarker={StepMarker}
            value={thoughtLikelihoodSliderTwo}
            minimumTrackTintColor='#007667'
            maximumTrackTintColor='#007667'
          />
        </View>

        {/* Situation Description */}
        <View>
          <Text style={[styles.headingText, { color: 'gray' }]}>
            Situatieomschrijving:
          </Text>
          <Text style={[styles.bodyText, { color: 'gray' }]}>
            {description}
          </Text>
        </View>

        {/* Feeling Description */}
        <View>
          <Text style={[styles.headingText, { color: 'gray' }]}>
            Gevoelsomschrijving:
          </Text>
          <Text style={[styles.bodyText, { color: 'gray' }]}>
            {feelingDescription}
          </Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            disabled={true}
            minimumValue={0}
            maximumValue={4}
            step={1}
            thumbTintColor='#00d7bc'
            StepMarker={StepMarker}
            value={thoughtLikelihoodSliderOne}
            minimumTrackTintColor='#007667'
            maximumTrackTintColor='#007667'
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  headingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
});
