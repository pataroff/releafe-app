import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

export const PerformanceCalendar = () => {
  const [selected, setSelected] = useState('');

  return (
    <>
      <Calendar
        headerStyle={{}}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <ChevronLeft color='black' />
          ) : (
            <ChevronRight color='black' />
          )
        }
        monthFormat='MMMM'
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markingType='custom'
        markedDates={{
          [`${new Date().toISOString().slice(0, 10)}`]: {
            customStyles: {
              text: {
                color: 'black',
              },
            },
          },
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'black',
          },
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({});
