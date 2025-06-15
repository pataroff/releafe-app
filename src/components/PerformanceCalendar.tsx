import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextStyle,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';

import { Divider } from 'react-native-paper';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { IDiaryEntry } from '../types';

import '../utils/localeConfig';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';

import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';

import { useDiary } from '../context/DiaryContext';

import Toast from 'react-native-toast-message';

const showToast = (
  type: 'error' | 'success' | 'info' | 'longError',
  title: string,
  message: string
) => {
  Toast.show({
    topOffset: 100,
    type,
    text1: title,
    text2: message,
  });
};

const windowWidth = Dimensions.get('window').width;

const dotColorMap = new Map([
  [1, '#ef4848'],
  [2, '#de5950'],
  [3, '#ce6957'],
  [4, '#d1927c'],
  [5, '#d3a14f'],
  [6, '#ddb364'],
  [7, '#d1cd79'],
  [8, '#8cab76'],
  [9, '#6bcc85'],
  [10, '#4aed94'],
]);

const sliderTitlesAndDescriptions = [
  [
    'Algeheel gevoel',
    'Je algemene gevoel op deze dag was overwegend positief.',
  ],
  ['Angst & zorgen', 'Je ervaarde redelijk wat angst en/of zorgen deze dag.'],
  ['Stress', 'Je ervaarde weinig stress deze dag.'],
  ['Energie', 'Je had erg veel energie deze dag.'],
  ['Concentratie', 'Je had erg weinig concentratie deze dag.'],
  ['Slaap', 'Je had de nacht ervoor gemiddeld geslapen.'],
];

const textQuestions = [
  'Heb jij je vandaag ergens zorgen over gemaakt?',
  'Zijn er ook andere dingen gebeurd die je gevoel hebben beïnvloed?',
  'Heb je ook dingen vermeden?',
  'Wat heeft je vandaag dankbaar, trots of blij gemaakt?',
];

interface PerformanceCalendarProps {
  selectedDiaryEntry: IDiaryEntry | null;
  setSelectedDiaryEntry: React.Dispatch<
    React.SetStateAction<IDiaryEntry | null>
  >;
}

export const PerformanceCalendar: React.FC<PerformanceCalendarProps> = ({
  selectedDiaryEntry,
  setSelectedDiaryEntry,
}) => {
  const navigation = useNavigation();
  const { diaryEntries } = useDiary();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayDate, setDisplayDate] = useState<string>('');
  const [displayTime, setDisplayTime] = useState<string>('');

  const [sliderQuestionIndex, setSliderQuestionIndex] = useState<number>(0);
  const [textQuestionIndex, setTextQuestionIndex] = useState<number>(0);

  const sliderValuesLength = 6;
  const textValuesLength = 4;

  useFocusEffect(
    useCallback(() => {
      initializeCalendar();
    }, [diaryEntries])
  );

  const initializeCalendar = async () => {
    const initialDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === getFormattedDate(selectedDate)
    );

    if (initialDiaryEntry) {
      setSelectedDiaryEntry(initialDiaryEntry);
      setDisplayDate(getFormattedDisplayDate(initialDiaryEntry.date));
      setDisplayTime(getFormattedDisplayTime(initialDiaryEntry.date));
    } else {
      setSelectedDiaryEntry(null);
      setDisplayDate(getFormattedDisplayDate(new Date()));
    }
  };

  const handleSelect = (selectedDay: string) => {
    const matchedEntry = diaryEntries.find(
      (entry) => entry.date.toISOString().slice(0, 10) === selectedDay
    );

    if (matchedEntry) {
      setSelectedDate(matchedEntry.date);
      setSelectedDiaryEntry(matchedEntry);
      setDisplayDate(getFormattedDisplayDate(matchedEntry.date));
      setDisplayTime(getFormattedDisplayTime(matchedEntry.date));
    } else {
      setSelectedDate(appendCurrentTime(new Date(selectedDay)));
      setSelectedDiaryEntry(null);
      setDisplayDate(getFormattedDisplayDate(new Date(selectedDay)));
      console.log('No diary entry found for selected date: ', selectedDay);
    }
  };

  const handleEditPress = () => {
    const today = new Date();
    const selected = new Date(selectedDate);

    today.setUTCHours(0, 0, 0, 0);
    selected.setUTCHours(0, 0, 0, 0);

    if (selected <= today) {
      // @ts-expect-error
      navigation.navigate('Diary', {
        screen: 'Diary1',
        params: {
          date: selectedDate,
        },
      });
    } else {
      showToast(
        'longError',
        'Datum ligt in de toekomst',
        'Je kunt alleen een dagboekinvulling toevoegen voor vandaag of een eerdere datum.'
      );
    }
  };

  const handlePreviousSlider = () => {
    if (sliderQuestionIndex !== 0) {
      setSliderQuestionIndex(sliderQuestionIndex - 1);
    }
  };

  const handleNextSlider = () => {
    // @ts-ignore
    if (sliderQuestionIndex === sliderValuesLength - 1) {
      setSliderQuestionIndex(0);
    } else {
      setSliderQuestionIndex(sliderQuestionIndex + 1);
    }
  };

  const handlePreviousText = () => {
    if (textQuestionIndex !== 0) {
      setTextQuestionIndex(textQuestionIndex - 1);
    }
  };

  const handleNextText = () => {
    // @ts-ignore
    if (textQuestionIndex === textValuesLength - 1) {
      setTextQuestionIndex(0);
    } else {
      setTextQuestionIndex(textQuestionIndex + 1);
    }
  };

  const getFormattedDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const getFormattedDisplayDate = (date: Date) => {
    return date.toLocaleString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const getFormattedDisplayTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', {
      timeStyle: 'short',
    });
  };

  const getDotColor = (index: number) => {
    return dotColorMap.get(Math.floor(index));
  };

  const getMarkedDates: { [key: string]: MarkingProps } = useMemo(() => {
    const markedDates: { [key: string]: MarkingProps } = {};

    diaryEntries.forEach((entry) => {
      const formattedDate = getFormattedDate(entry.date);
      const dotColor = getDotColor(entry.sliderValues[0]);

      markedDates[formattedDate] = {
        marked: true,
        type: 'custom',
        customStyles: {
          container: {},
          text: {
            color: 'black',
          },
        },
        dotColor,
      };
    });

    // Mark the selected date with custom styles
    const selectedDateFormatted = getFormattedDate(selectedDate);
    markedDates[selectedDateFormatted] = {
      ...(markedDates[selectedDateFormatted] || {}),
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#A9C1A1',
      selectedTextColor: 'white',
      type: 'custom',
      customStyles: {
        container: {
          backgroundColor: '#A9C1A1',
          borderRadius: 30,
          marginTop: -4,
          paddingTop: 4,
        },
        text: {},
      },
      dotColor: 'transparent',
    };

    return markedDates;
  }, [diaryEntries, selectedDate]);

  const appendCurrentTime = (date: Date) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    date.setHours(hours, minutes, seconds, milliseconds);
    return date;
  };

  const min = useSharedValue(1);
  const max = useSharedValue(10);
  const sliderValue = useSharedValue(5.5);

  // Slider Value Update
  useEffect(() => {
    const value = selectedDiaryEntry?.sliderValues[sliderQuestionIndex];
    sliderValue.value = value !== undefined ? value : 5.5;
  }, [sliderQuestionIndex, selectedDiaryEntry?.sliderValues]);

  const CustomThumb: React.FC<{}> = () => {
    return (
      <View
        style={{
          backgroundColor: '#C1DEBE',
          height: 28,
          width: 28,
          borderRadius: 99,
        }}
      ></View>
    );
  };

  return (
    <>
      <CalendarProvider
        style={{
          marginTop: 40,
          // Shadow Test
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
        date={getFormattedDate(selectedDate)}
      >
        {/* https://github.com/wix/react-native-calendars/issues/1937#issuecomment-2186829555 */}
        <ExpandableCalendar
          calendarWidth={windowWidth - 2 * 20}
          style={{ borderRadius: 30, overflow: 'hidden' }}
          theme={{
            todayTextColor: 'black',
            selectedDayBackgroundColor: 'transparent', // !IMPORTANT
            selectedDayTextColor: 'black', // !IMPORTANT
            textMonthFontFamily: 'SofiaPro-Medium',
            textDayFontFamily: 'SofiaPro-Regular',
            arrowColor: 'black',
            monthTextColor: 'black',
            // @ts-ignore
            'stylesheet.dot': {
              dot: {
                position: 'absolute',
                top: -5,
                width: 7,
                height: 7,
                borderRadius: 30,
              },
            },
          }}
          monthFormat='MMMM yyyy'
          firstDay={1}
          closeOnDayPress={false}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <Feather
                name='chevron-left'
                size={24}
                color='black'
                style={{ marginLeft: 40 }}
              />
            ) : (
              <Feather
                name='chevron-right'
                size={24}
                color='black'
                style={{ marginRight: 40 }}
              />
            )
          }
          onDayPress={(date) => {
            handleSelect(date.dateString);
          }}
          markingType='custom'
          markedDates={getMarkedDates}
        />
      </CalendarProvider>

      {selectedDiaryEntry ? (
        <View
          style={[
            {
              marginTop: 40,
              backgroundColor: 'white',
              borderRadius: 30,
              // Shadow Test
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            },
          ]}
        >
          <View style={styles.dataHeadersContainer}>
            <Text style={styles.dataTitleText}>
              Datum:
              <Text
                style={{ ...Fonts.sofiaProRegular[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayDate}
              </Text>
            </Text>
            <Text style={styles.dataTitleText}>
              Tijd van invullen:
              <Text
                style={{ ...Fonts.sofiaProRegular[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayTime} uur
              </Text>
            </Text>
          </View>

          {/* Sliders Data */}
          <View style={styles.dataSlidersContainer}>
            <Text style={styles.dataHeadingText}>
              {sliderTitlesAndDescriptions[sliderQuestionIndex][0]}
            </Text>
            <Slider
              disable={true}
              containerStyle={{ width: '100%', borderRadius: 30 }}
              progress={sliderValue}
              minimumValue={min}
              maximumValue={max}
              sliderHeight={15}
              thumbWidth={25}
              theme={{
                minimumTrackTintColor: '#E4E1E1',
                maximumTrackTintColor: '#E4E1E1',
              }}
              renderThumb={() => <CustomThumb />}
            />
          </View>

          {/* Slider Index Controls */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
              paddingHorizontal: 25,
            }}
          >
            <Pressable
              onPress={() => handlePreviousSlider()}
              disabled={sliderQuestionIndex == 0 ? true : false}
              style={sliderQuestionIndex == 0 ? { opacity: 0.4 } : {}}
            >
              <MaterialCommunityIcons
                name='chevron-left-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>

            <View
              style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}
            >
              {Array.from({ length: sliderValuesLength }).map((_, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor:
                        index === sliderQuestionIndex ? '#829c7a' : '#E4E1E1',
                      borderRadius: 99,
                    }}
                  ></View>
                );
              })}
            </View>

            <Pressable
              onPress={() => handleNextSlider()}
              disabled={
                sliderQuestionIndex == sliderValuesLength - 1 ? true : false
              }
              style={
                sliderQuestionIndex == sliderValuesLength - 1
                  ? { opacity: 0.4 }
                  : {}
              }
            >
              <MaterialCommunityIcons
                name='chevron-right-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>
          </View>

          <Divider style={{ marginHorizontal: 30 }} bold={true} />

          <View style={{ marginTop: 30, paddingHorizontal: 25 }}>
            <Text style={styles.dataHeadingText}>Aanvullende vragen</Text>
            <Text style={styles.dataDescriptionText}>
              {textQuestions[textQuestionIndex]}
            </Text>
            <TextInput
              editable={false}
              value={selectedDiaryEntry.textValues[textQuestionIndex]}
              style={styles.dataTextInputContainer}
              multiline={true}
              placeholder='Niet ingevuld'
              placeholderTextColor='black'
            />
          </View>

          {/* Text Index Controls */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
              paddingHorizontal: 25,
            }}
          >
            <Pressable
              onPress={() => handlePreviousText()}
              disabled={textQuestionIndex == 0 ? true : false}
              style={textQuestionIndex == 0 ? { opacity: 0.4 } : {}}
            >
              <MaterialCommunityIcons
                name='chevron-left-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>

            <View
              style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}
            >
              {Array.from({ length: textValuesLength }).map((_, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor:
                        index === textQuestionIndex ? '#829c7a' : '#E4E1E1',
                      borderRadius: 99,
                    }}
                  ></View>
                );
              })}
            </View>

            <Pressable
              onPress={() => handleNextText()}
              disabled={
                textQuestionIndex == textValuesLength - 1 ? true : false
              }
              style={
                textQuestionIndex == textValuesLength - 1
                  ? { opacity: 0.4 }
                  : {}
              }
            >
              <MaterialCommunityIcons
                name='chevron-right-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>
          </View>

          {/* TODO: Adjust the editing to the new diary flow! */}
          {/* Edit Button */}
          <Pressable style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editButtonText}>Pas gegevens aan</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            marginTop: 40,
            backgroundColor: 'white',
            borderRadius: 30,
            // Shadow Test
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <View style={styles.dataHeadersContainer}>
            <Text style={styles.dataTitleText}>
              Datum:
              <Text
                style={{ ...Fonts.sofiaProMedium[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayDate}
              </Text>
            </Text>
            <Text style={styles.dataTitleText}>
              Tijd van invullen:
              <Text
                style={{ ...Fonts.sofiaProMedium[Platform.OS] } as TextStyle}
              >
                {' '}
                -
              </Text>
            </Text>
          </View>

          <View style={styles.noDataContainer}>
            <Text style={styles.noDataTitleText}>
              Nog geen gegevens beschikbaar
            </Text>
            <Text style={styles.noDataDescriptionText}>
              Vul het dagboek van deze dag alsnog {'\n'}in om jouw proces weer
              te geven
            </Text>
          </View>
          <Pressable style={styles.diaryButton} onPress={handleEditPress}>
            <Text style={styles.diaryButtonText}>Vul het dagboek in</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dataHeadersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  dataSlidersContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  dataTitleText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  dataHeadingText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
    marginBottom: 5,
  } as TextStyle,
  dataDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  noDataContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  noDataTitleText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  diaryButton: {
    width: 160,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 13,
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 20,
    backgroundColor: '#5c6b57',
  },
  diaryButtonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  editButton: {
    width: 160,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 13,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 25,
    backgroundColor: '#5c6b57',
  },
  editButtonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  dataTextInputContainer: {
    verticalAlign: Platform.OS === 'android' ? 'top' : undefined,
    fontSize: 14,
    height: 150,
    ...Fonts.sofiaProRegular[Platform.OS],
    borderRadius: 10,
    paddingTop: 20,
    paddingLeft: 20,
    marginTop: 20,
    backgroundColor: '#F6F7F8',
  } as TextStyle,
});
