import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
  TextStyle,
  Platform,
  TextInput,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import '../utils/localeConfig';
import { Calendar } from 'react-native-calendars';

import { Timeframe } from '../types';
import { GoalContext } from '../context/GoalContext';
import {
  categories,
  categoryGoals,
  categoryIcons,
  getDescription,
  getGoalCategory,
  getGoalCategoryIcon,
  getGoalCategoryString,
  getTimeframeString,
} from '../utils/goal';
import { Fonts } from '../styles';

import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

import { CloseModal } from './CloseModal';

const windowWidth = Dimensions.get('window').width;

const timeframeDropdownData = [
  { label: 'Dagelijks', value: Timeframe.Daily },
  { label: 'Wekelijks', value: Timeframe.Weekly },
  { label: 'Maandelijks', value: Timeframe.Monthly },
];

interface GoalListItemAddModalProps {
  modalAddGoalListItemVisible: boolean;
  setModalAddGoalListItemVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GoalListItemAddModal: React.FC<GoalListItemAddModalProps> = ({
  modalAddGoalListItemVisible,
  setModalAddGoalListItemVisible,
}) => {
  const {
    category,
    title,
    description,
    sentence,
    timeframe,
    targetFrequency,
    startDate,
    endDate,
    setCategory,
    setTitle,
    setDescription,
    setSentence,
    setTimeframe,
    setTargetFrequency,
    setStartDate,
    setEndDate,
    createGoalEntry,
    resetGoalEntryFields,
  } = useContext(GoalContext);

  const [goalListItemAddModalIndex, setGoalListItemAddModalIndex] =
    useState<number>(0);

  const [goalEndText, setGoalEndText] = useState<string>('');
  const [goalSpecialDropdownOptions, setGoalSpecialDropdownOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [timeframeDropdownValue, setTimeframeDropdownValue] =
    useState<Timeframe>(Timeframe.Daily);
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [specialDropdownText, setSpecialDropdownText] = useState<string>('');
  const [specialDropdownValue, setSpecialDropdownValue] = useState<string>('');

  const [timeframeDropdownIsFocus, setTimeframeDropdownIsFocus] =
    useState<boolean>(false);
  const [specialDropdownIsFocus, setSpecialDropdownIsFocus] =
    useState<boolean>(false);

  const [markedDates, setMarkedDates] = useState<{}>({});

  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);

  const handleCalendarPeriodSelect = (day: string) => {
    type MarkedDatesType = Record<
      string,
      {
        selected?: boolean;
        startingDay?: boolean;
        endingDay?: boolean;
        color: string;
      }
    >;

    // Helper function to get all dates between two dates
    const getDatesInRange = (start: Date, end: Date) => {
      const dates: string[] = [];
      let currentDate = new Date(start);

      while (currentDate < end) {
        // Stop before the end date to avoid rounding errors
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Add the end date explicitly to ensure it's included
      dates.push(end.toISOString().split('T')[0]);

      return dates;
    };

    if (startDate === null) {
      // Set the start date
      setStartDate(new Date(day));
      setMarkedDates((prevMarkedDates) => ({
        [day]: {
          selected: true,
          startingDay: true,
          color: '#90A38A',
        },
      }));
    } else if (startDate && endDate === null) {
      // Set the end date and color the range between start and end
      const selectedEndDate = new Date(day);
      setEndDate(selectedEndDate);

      const datesInRange = getDatesInRange(startDate, selectedEndDate);

      setMarkedDates((prevMarkedDates) => {
        const rangeMarkedDates = datesInRange.reduce<MarkedDatesType>(
          (acc, date, index) => {
            if (index === 0) {
              acc[date] = {
                selected: true,
                startingDay: true,
                color: '#90A38A',
              };
            } else if (index === datesInRange.length - 1) {
              acc[date] = { selected: true, endingDay: true, color: '#5C6B57' };
            } else {
              acc[date] = { color: '#E5F1E3' }; // Mark all days in the range with green
            }
            return acc;
          },
          {}
        );

        return { ...prevMarkedDates, ...rangeMarkedDates };
      });
    } else {
      // Reset if both start and end date are selected (allowing reselection)
      setStartDate(null);
      setEndDate(null);
      setMarkedDates({});
    }
  };

  const validateTextInput = (text: string, max: number) => {
    const min = 1;
    const number = parseInt(text, 10);

    if (!isNaN(number) && number >= min && number <= max) {
      setTextInputValue(text);
      setTargetFrequency(number);
    } else if (text === '') {
      setTextInputValue('');
    }
  };

  const handleCategorySelect = (index: number) => {
    setCategory(getGoalCategory(index));
    setGoalListItemAddModalIndex(goalListItemAddModalIndex + 1);
  };

  const handleGoalSelect = (
    title: string,
    description: string,
    endText: string,
    dropdownText?: string,
    dropdownOptions?: { label: string; value: string }[]
  ) => {
    setTitle(title);
    setDescription(description);
    setGoalEndText(endText);
    setGoalListItemAddModalIndex(goalListItemAddModalIndex + 1);
    // Handle optional params
    setSpecialDropdownText(dropdownText || '');
    setGoalSpecialDropdownOptions(dropdownOptions || []);
  };

  const handleGoalSentence = () => {
    setSentence(
      `Ik wil ${getTimeframeString(timeframe)} ${targetFrequency}x${
        specialDropdownValue ? ` ${specialDropdownValue}` : ``
      } ${goalEndText}`
    );
    setGoalListItemAddModalIndex(goalListItemAddModalIndex + 1);
  };

  const handleBack = () => {
    if (goalListItemAddModalIndex !== 0) {
      setGoalListItemAddModalIndex(goalListItemAddModalIndex - 1);
    }
  };

  const handleFinish = () => {
    createGoalEntry();
    resetGoalEntryFields();
    resetLocalState();
  };

  const handleClose = () => {
    resetGoalEntryFields();
    resetLocalState();
    setModalAddGoalListItemVisible(!modalAddGoalListItemVisible);
  };

  const getNextWeek = () => {
    const today = new Date();
    const nextSunday = new Date(today);
    const dayOfWeek = today.getDay();

    const daysUntilSunday = ((7 - dayOfWeek) % 7) + 1;
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);

    return nextSunday.toISOString().split('T')[0];
  };

  const getNextMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today);

    nextMonth.setMonth(today.getMonth() + 1);
    nextMonth.setDate(2);
    nextMonth.setHours(0, 0, 0, 0);

    return nextMonth.toISOString().split('T')[0];
  };

  const resetLocalState = () => {
    setTimeframeDropdownValue(Timeframe.Daily);
    setTextInputValue('');
    setSpecialDropdownValue('');
    setMarkedDates({});
    setGoalListItemAddModalIndex(0);
    setModalAddGoalListItemVisible(!modalAddGoalListItemVisible);
  };

  // @TODO: Move this into `utils/goal.ts`!
  const highlightFrequency = (sentence: string) => {
    const keywords = ['dagelijks', 'wekelijks', 'maandelijks'];
    const words = sentence.split(' ');

    let modifiedWords: React.ReactNode[] = [];
    let shouldBoldNext = false;

    words.forEach((word, index) => {
      if (shouldBoldNext) {
        modifiedWords.push(
          <Text key={index} style={styles.boldText}>
            {word + ' '}
          </Text>
        );
        shouldBoldNext = false;
      } else if (keywords.some((keyword) => word.startsWith(keyword))) {
        modifiedWords.push(
          <Text key={index} style={styles.boldText}>
            {word + ' '}
          </Text>
        );
        shouldBoldNext = true;
      } else {
        modifiedWords.push(<Text key={index}>{word + ' '}</Text>);
      }
    });

    return modifiedWords;
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalAddGoalListItemVisible}
      onRequestClose={() =>
        setModalAddGoalListItemVisible(!modalAddGoalListItemVisible)
      }
    >
      <CloseModal
        closeModalVisible={closeModalVisible}
        setCloseModalVisible={setCloseModalVisible}
        parentModalVisible={modalAddGoalListItemVisible}
        setParentModalVisible={setModalAddGoalListItemVisible}
        title='Stoppen met doel toevoegen'
        description='Je staat op het punt te stoppen met het aanmaken van dit persoonlijk doel. Weet je het zeker?'
        handleClose={handleClose}
      />
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={styles.headersContainer}>
            {/* Title + Close Button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headersTitleText}>Nieuwe doel toevoegen</Text>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => setCloseModalVisible(!closeModalVisible)}
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>

            {/* Instructions */}
            <Text style={[styles.headersDescriptionText, { fontSize: 14 }]}>
              {getDescription(goalListItemAddModalIndex)}
            </Text>

            {/* Selected Goal */}
            {goalListItemAddModalIndex === 2 && (
              <View
                style={{
                  marginTop: 20,
                  rowGap: 10,
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    columnGap: 5,
                  }}
                >
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={getGoalCategoryIcon(category)}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <Text style={styles.h2Text}>
                      {getGoalCategoryString(category)}
                    </Text>
                    <Text style={styles.h3Text}>{title}</Text>
                  </View>
                </View>
                <Text style={styles.bodyText}>{description}</Text>
              </View>
            )}
          </View>

          {/* Main Content Wrapper */}
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.goalContainer}
            contentContainerStyle={styles.goalContentContainerStyles}
          >
            {goalListItemAddModalIndex === 0 && (
              <View style={styles.categoriesContainer}>
                {categories.map((category, index) => (
                  <Pressable
                    key={index}
                    style={styles.categoryComponent}
                    onPress={() => handleCategorySelect(index)}
                  >
                    {/* Icon + Title + Description */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%',
                        columnGap: 5,
                      }}
                    >
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={categoryIcons[index]}
                      />
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          height: '100%',
                          width: '73%',
                        }}
                      >
                        <Text style={styles.h3Text}>{category[0]}</Text>
                        <Text style={styles.bodyText}>{category[1]}</Text>
                      </View>

                      {/* Chevron Right Icon */}
                      <Entypo name='chevron-right' size={34} color='#5C6B57' />
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
            {goalListItemAddModalIndex === 1 && (
              <View style={styles.goalsContainer}>
                {/* @ts-ignore */}
                {categoryGoals.get(category).map((goal, index) => (
                  <Pressable
                    key={index}
                    style={styles.goalComponent}
                    onPress={() =>
                      handleGoalSelect(
                        goal.title,
                        goal.description,
                        goal.endText,
                        goal.dropdownText,
                        goal.dropdownOptions
                      )
                    }
                  >
                    {/* Icon + Category + Title */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        columnGap: 5,
                      }}
                    >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={getGoalCategoryIcon(category)}
                      />
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          width: '100%',
                        }}
                      >
                        {/* Category */}
                        <Text style={styles.h2Text}>{goal.category}</Text>
                        {/* Title */}
                        <Text style={styles.h3Text}>{goal.title}</Text>
                      </View>
                    </View>
                    {/* Description */}
                    <Text style={styles.bodyText}>{goal.description}</Text>
                  </Pressable>
                ))}
              </View>
            )}
            {goalListItemAddModalIndex === 2 && (
              <View style={styles.selectionMenusContainer}>
                {/* Timeframe Menu */}
                <View style={styles.menuComponent}>
                  <Text style={styles.h2Text}>Mijn doel</Text>
                  <Text style={styles.h3Text}>{title}</Text>
                  <Text style={styles.bodyText}>
                    Binnen welk tijdsbestek wil jij je doel opstellen en
                    evalueren?
                  </Text>

                  {/* Dropdown */}
                  <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    iconColor='black'
                    iconStyle={styles.icon}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    itemContainerStyle={styles.itemContainerStyle}
                    data={timeframeDropdownData}
                    labelField='label'
                    valueField='value'
                    placeholder='Kies een tijdsbestek'
                    placeholderStyle={styles.placeholderStyle}
                    value={timeframeDropdownValue}
                    onChange={(item) => {
                      setTimeframeDropdownValue(item.value);
                      setTimeframe(item.value);
                      setMarkedDates({});
                    }}
                    onFocus={() => setTimeframeDropdownIsFocus(true)}
                    onBlur={() => setTimeframeDropdownIsFocus(false)}
                    renderRightIcon={() => (
                      <Feather
                        name={`${
                          timeframeDropdownIsFocus
                            ? 'chevron-up'
                            : 'chevron-down'
                        }`}
                        size={24}
                      />
                    )}
                  />
                </View>

                {/* Target Frequency Menu */}
                {timeframe !== Timeframe.Daily && (
                  <View style={styles.menuComponent}>
                    <Text style={styles.h2Text}>Mijn doel</Text>
                    <Text style={styles.h3Text}>{title}</Text>
                    <Text style={styles.bodyText}>
                      Hoe vaak wil je je doel behalen binnen het gekozen
                      tijdsbestek?
                    </Text>
                    <Text style={styles.bodyText}>
                      Selecteer een aantal tussen:{'\n'}Wekelijks: 1 - 7 keer.
                      {'\n'}
                      Maandelijks: 1 - 30 keer.
                    </Text>
                    {/* Text Input */}
                    <TextInput
                      value={textInputValue}
                      onChangeText={(text) =>
                        validateTextInput(
                          text,
                          timeframe === Timeframe.Weekly ? 7 : 30
                        )
                      }
                      inputMode='numeric'
                      style={styles.textInputStyle}
                      placeholder='Maak een keuze...'
                    />
                  </View>
                )}

                {/* Special Dropdown Menu */}
                {goalSpecialDropdownOptions.length > 0 && (
                  <View style={styles.menuComponent}>
                    <Text style={styles.h2Text}>Mijn doel</Text>
                    <Text style={styles.h3Text}>{title}</Text>
                    <Text style={styles.bodyText}>{specialDropdownText}</Text>

                    {/* Dropdown */}
                    <Dropdown
                      style={styles.dropdown}
                      containerStyle={styles.dropdownContainer}
                      iconColor='black'
                      iconStyle={styles.icon}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      itemContainerStyle={styles.itemContainerStyle}
                      data={goalSpecialDropdownOptions}
                      labelField='label'
                      valueField='value'
                      placeholder='Selecteer een aantal'
                      placeholderStyle={styles.placeholderStyle}
                      value={specialDropdownValue}
                      onChange={(item) => {
                        setSpecialDropdownValue(item.value);
                      }}
                      onFocus={() => setSpecialDropdownIsFocus(true)}
                      onBlur={() => setSpecialDropdownIsFocus(false)}
                      renderRightIcon={() => (
                        <Feather
                          name={`${
                            specialDropdownIsFocus
                              ? 'chevron-up'
                              : 'chevron-down'
                          }`}
                          size={24}
                        />
                      )}
                    />
                  </View>
                )}

                <View style={styles.menuComponent}>
                  <Text style={[styles.h2Text, { textAlign: 'center' }]}>
                    Start- en einddatum
                  </Text>

                  {/* Calendar */}
                  <Calendar
                    // Old functionality
                    // minDate={
                    //   timeframe !== Timeframe.Daily
                    //     ? timeframe === Timeframe.Weekly
                    //       ? getNextWeek()
                    //       : getNextMonth()
                    //     : new Date().toISOString().split('T')[0]
                    // }

                    minDate={new Date().toISOString().split('T')[0]}
                    onDayPress={(day) =>
                      handleCalendarPeriodSelect(day.dateString)
                    }
                    markingType={'period'}
                    markedDates={markedDates}
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
                  />
                  <Pressable
                    onPress={() => handleGoalSentence()}
                    style={styles.viewButton}
                  >
                    <Text style={styles.buttonText}>Doel bekijken</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {goalListItemAddModalIndex === 3 && (
              <View style={styles.selectedGoalContainer}>
                <View style={styles.selectedGoalComponent}>
                  <View
                    style={{
                      rowGap: 10,
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        columnGap: 5,
                      }}
                    >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={getGoalCategoryIcon(category)}
                      />
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          width: '100%',
                        }}
                      >
                        <Text style={styles.h2Text}>
                          {getGoalCategoryString(category)}
                        </Text>
                        <Text style={styles.h3Text}>{title}</Text>
                      </View>
                    </View>
                    <Text style={styles.bodyText}>
                      {highlightFrequency(sentence)}
                    </Text>
                    <Text style={styles.h3Text}>
                      Startdatum:{' '}
                      <Text style={styles.bodyText}>
                        {startDate?.toLocaleDateString('nl-NL', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </Text>
                    </Text>
                    <Text style={styles.h3Text}>
                      Einddatum:{' '}
                      <Text style={styles.bodyText}>
                        {endDate?.toLocaleDateString('nl-NL', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
          {/* TODO: Is there a way to achieve this layout without a wrapper? */}
          {/* Progress Wrapper */}
          <View
            style={{
              position: 'absolute',
              bottom: 40,
              width: '100%',
              alignSelf: 'center',
              paddingHorizontal: 15,
            }}
          >
            {/* Progress Container */}
            <View style={styles.progressContainer}>
              {/* Buttons Container */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Go Back Button */}
                <Pressable
                  onPress={() => handleBack()}
                  disabled={goalListItemAddModalIndex == 0 ? true : false}
                  style={
                    goalListItemAddModalIndex == 0
                      ? [styles.backButton, { opacity: 0.4 }]
                      : styles.backButton
                  }
                >
                  <Text style={styles.buttonText}>Ga terug</Text>
                </Pressable>
                {/* Finish Button */}
                {goalListItemAddModalIndex === 3 && (
                  <Pressable
                    onPress={() => handleFinish()}
                    style={styles.finishButton}
                  >
                    <Text style={styles.buttonText}>Opslaan en afsluiten</Text>
                  </Pressable>
                )}
              </View>
              {/* Progress Dots Container */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  columnGap: 7,
                }}
              >
                {Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor:
                          index === goalListItemAddModalIndex
                            ? '#829c7a'
                            : '#E4E1E1',
                        borderRadius: 99,
                      }}
                    ></View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    borderRadius: 15,
    height: '90%',
    width: windowWidth,
    backgroundColor: '#E5F1E3',
    display: 'flex',
    flexDirection: 'column',
  },
  headersContainer: {
    width: '100%',
    padding: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headersTitleText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  goalContainer: {
    flex: 1,
  },
  goalContentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoriesContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  categoryComponent: {
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    height: 100,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  goalsContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  goalComponent: {
    flex: 1,
    rowGap: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectionMenusContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  menuComponent: {
    flex: 1,
    rowGap: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedGoalContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  selectedGoalComponent: {
    flex: 1,
    rowGap: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#F6FFF3',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  h2Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  h3Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  boldText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
  progressContainer: {
    width: '100%',
    height: 115,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    width: 130,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#a8c1a0',
  },
  finishButton: {
    width: 170,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#5C6B57',
  },
  buttonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 13,
    color: 'white',
  } as TextStyle,
  viewButton: {
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 8,
    backgroundColor: '#5c6b57',
  },
  // @TODO: Move the dropdown and it's styles into a separate component!
  dropdown: {
    height: 45,
    width: '100%',
    backgroundColor: '#EDF8E9',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
  },
  placeholderStyle: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  selectedTextStyle: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  itemTextStyle: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  dropdownContainer: {
    width: '79%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  itemContainerStyle: {
    borderRadius: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
  textInputStyle: {
    marginTop: 5,
    backgroundColor: '#f6f7f8',
    padding: 10,
    borderRadius: 10,
  },
});
