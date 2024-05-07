import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';
import {
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import { ChevronLeft, ChevronRight } from 'react-native-feather';

LocaleConfig.locales['nl'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mrt',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag',
  ],
  dayNamesShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
  today: 'Vandaag',
};

LocaleConfig.defaultLocale = 'nl';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const currentDate = new Date().toISOString().slice(0, 10);

export const PerformanceCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState(currentDate);

  return (
    <>
      <CalendarProvider date={currentDate}>
        <ExpandableCalendar
          theme={{
            todayTextColor: 'black',
            selectedDayTextColor: 'white',
            selectedDayBackgroundColor: 'black',
            textMonthFontFamily: 'Poppins-Medium',
            textDayFontFamily: 'Poppins-Regular',
            arrowColor: 'black',
            monthTextColor: 'black',
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
          monthFormat='MMMM'
          initialPosition={ExpandableCalendar.positions.CLOSED}
          hideArrows={isOpen ? false : true}
          hideExtraDays={true}
          // hideDayNames={true} // This bugs the week view when enabled!
          allowShadow={false}
          firstDay={1}
          closeOnDayPress={false}
          onCalendarToggled={() => setIsOpen(!isOpen)}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <ChevronLeft color='black' style={{ marginLeft: 75 }} />
            ) : (
              <ChevronRight color='black' style={{ marginRight: 75 }} />
            )
          }
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markingType='custom'
          markedDates={{
            ['2024-05-01']: {
              marked: true,
              dotColor: '#ef4848',
            },
            ['2024-05-02']: {
              marked: true,
              dotColor: '#ddb354',
            },
            ['2024-05-03']: {
              marked: true,
              dotColor: '#8cab76',
            },
            ['2024-05-04']: {
              marked: true,
              dotColor: '#ce6957',
            },
            ['2024-05-05']: {
              marked: true,
              dotColor: '#4aed94',
            },
            ['2024-05-06']: {
              marked: true,
              dotColor: '#6bcc85',
            },
            ['2024-05-07']: {
              marked: true,
              dotColor: '#d1cd79',
            },
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'black',
              selectedTextColor: 'white',
            },
          }}
        />
      </CalendarProvider>
    </>
  );
};

const styles = StyleSheet.create({});
