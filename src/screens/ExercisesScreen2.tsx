import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
  TextStyle,
  Platform,
} from 'react-native';

import { Fonts } from '../styles';
import { useNavigation } from '@react-navigation/native';

import { ExercisesList } from '../components/ExercisesList';

const windowWidth = Dimensions.get('window').width;

export const ExercisesScreen2: React.FC<{ route: any }> = ({ route }) => {
  const { category, description } = route.params;
  const navigation = useNavigation();

  const [showOnlyFavourites, setShowOnlyFavourites] = useState<boolean>(false);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>{category}</Text>
          <Text style={styles.headersDescriptionText}>{description}</Text>
        </View>

        {/* Exercises List */}
        <ExercisesList
          category={category}
          showOnlyFavourites={showOnlyFavourites}
        />
      </ScrollView>

      {/* Bottom Bar Wrapper */}
      <View
        style={{
          position: 'absolute',
          bottom: 120,
          width: '100%',
          alignSelf: 'center',
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 20,
            // Shadow Test
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Pressable
            onPress={() => {
              setShowOnlyFavourites(false);
              navigation.goBack();
            }}
            style={{
              marginVertical: 25,
              width: 200,
              borderRadius: 10,
              backgroundColor: '#829B7A',
              paddingVertical: 14,
            }}
          >
            <Text
              style={
                {
                  ...Fonts.sofiaProSemiBold[Platform.OS],
                  color: 'white',
                  textAlign: 'center',
                } as TextStyle
              }
            >
              Ga terug naar overzicht
            </Text>
          </Pressable>

          {/* Button Icons Container */}
          <View
            style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}
          >
            {/* Favourites Icon */}
            {
              <Pressable
                onPress={() => setShowOnlyFavourites(!showOnlyFavourites)}
              >
                {showOnlyFavourites ? (
                  <Image
                    resizeMode='contain'
                    style={{ width: 50, height: 50 }}
                    source={require('../../assets/images/exercises_favourites_on_icon.png')}
                  />
                ) : (
                  <Image
                    resizeMode='contain'
                    style={{ width: 50, height: 50 }}
                    source={require('../../assets/images/exercises_favourites_off_icon.png')}
                  />
                )}
              </Pressable>
              /*)*/
            }
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProLight[Platform.OS],
    lineHeight: 18,
    marginTop: 10,
  } as TextStyle,
});
