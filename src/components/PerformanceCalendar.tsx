import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, TextStyle } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
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

const currentDate = new Date().toISOString().slice(0, 10);

export const PerformanceCalendar = () => {
  const [selected, setSelected] = useState(currentDate);

  return (
    <>
      <Calendar
        style={{
          marginTop: 20,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 30,
          height: 350,
        }}
        headerStyle={{ marginBottom: 15 }}
        theme={{
          todayTextColor: 'black',
          selectedDayTextColor: 'black',
          textMonthFontFamily: 'Poppins-Medium',
          textDayFontFamily: 'Poppins-Regular',
          arrowColor: 'black',
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
        hideDayNames={true}
        // hideArrows={true}
        // hideExtraDays={true}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <ChevronLeft color='black' style={{ marginLeft: 50 }} />
          ) : (
            <ChevronRight color='black' style={{ marginRight: 50 }} />
          )
        }
        monthFormat='MMMM'
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markingType='custom'
        markedDates={{
          ['2024-04-01']: {
            marked: true,
            dotColor: 'red',
          },
          ['2024-04-02']: {
            marked: true,
            dotColor: 'green',
          },
          ['2024-04-03']: {
            marked: true,
            dotColor: 'orange',
          },
          ['2024-04-04']: {
            marked: true,
            dotColor: 'green',
          },
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'black',
            selectedTextColor: 'white',
          },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});
