import React, { useEffect, useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { IWorryListItem } from '../types';
import pb from '../lib/pocketbase';

import { AuthContext } from '../context/AuthContext';
import { WorryContext } from '../context/WorryContext';
import { useNavigation } from '@react-navigation/native';

import Drawer from '../components/Drawer';

export const WorryBoxScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { setWorryEntries } = useContext(WorryContext);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (user) {
        try {
          // TODO: Consider subscribing to the `worry_entries` collection!
          const worryEntriesList = await pb
            .collection('worry_entries')
            .getList(1, 50, {
              filter: `user.id='${user.id}'`,
              sort: '-date', // desc order
              expand: 'user',
            });

          const modifiedWorryEntriesList: IWorryListItem[] =
            worryEntriesList.items.map((item) => {
              const {
                id,
                category,
                priority,
                date,
                title,
                description,
                reframed,
              } = item;
              return {
                id,
                category,
                date: new Date(date),
                priority,
                title,
                description,
                reframed,
              };
            });

          setWorryEntries(modifiedWorryEntriesList);
        } catch (error) {
          console.error('Error fetching worry entries:', error);
        }
      }
    };

    fetchDiaryEntries();

    navigation.setOptions({ headerTitle: 'Zorgenbakje' });
  }, [navigation]);

  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Drawer />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
});
