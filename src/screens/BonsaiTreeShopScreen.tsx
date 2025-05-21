import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  TextStyle,
  Image,
  Platform,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { Header } from '../components/Header';
import { PurchaseModal } from '../components/PurchaseModal';

import { bonsaiShopCategories } from '../utils/bonsai';
import { useGamification } from '../context/GamificationContext';
import Toast from 'react-native-toast-message';
import { NotEnoughPointsModal } from '../components/NotEnoughPointsModal';

const windowWidth = Dimensions.get('window').width;

export const BonsaiTreeShopScreen: React.FC = ({ route }) => {
  const title = '';
  const { points, unlockedItems, unlockItem } = useGamification();

  const [purchaseModalVisible, setPurchaseModalVisible] =
    useState<boolean>(false);
  const [notEnoughPointsModalVisible, setNotEnoughPointsModalVisible] =
    useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    itemId: string;
    price: number;
  } | null>(null);

  const handleIconPress = (itemId: string, price: number) => {
    if (unlockedItems.includes(itemId)) {
      // @TODO Show toast message/modal to the user!
      return;
    }

    setSelectedItem({ itemId, price });
    setPurchaseModalVisible(true);
  };
  const showToast = (
    type: 'error' | 'success' | 'info',
    title: string,
    message: string
  ) => {
    Toast.show({
      topOffset: 20,
      type,
      text1: title,
      text2: message,
    });
  };

  const handleConfirmPurchase = () => {
    if (!selectedItem) return;

    const { itemId, price } = selectedItem;

    if (points < price) {
      setPurchaseModalVisible(false);
      setTimeout(() => {
        setNotEnoughPointsModalVisible(true);
      }, 100);
      return;
    }

    unlockItem(itemId, price);
    setPurchaseModalVisible(false);
  };

  return (
    <>
      <StatusBar />
      <Header title={title} route={route} />

      <NotEnoughPointsModal
        visible={notEnoughPointsModalVisible}
        onClose={() => setNotEnoughPointsModalVisible(false)}
      />
      <PurchaseModal
        visible={purchaseModalVisible}
        price={selectedItem?.price || 0}
        onConfirm={handleConfirmPurchase}
        onCancel={() => setPurchaseModalVisible(false)}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        {/* Headers */}
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>Puntenwinkel</Text>
          <Text style={styles.headersDescriptionText}>
            Koop hier updates voor jouw bonsaiboom, en verdien Releafe-punten
            voor meer updates!
          </Text>
        </View>

        {/* Bonsai Category Row */}
        {bonsaiShopCategories.map((category, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                ...(Fonts.sofiaProBold[Platform.OS] as TextStyle),
                fontSize: 18,
                paddingHorizontal: 30,
              }}
            >
              {category.title}
            </Text>

            {/* Icons */}
            <ScrollView
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 15,
                paddingVertical: 15,
                paddingHorizontal: 30,
              }}
            >
              {category.icons.map((item, iconIndex) => (
                <View key={iconIndex} style={{ alignItems: 'center' }}>
                  {/* Icon Container */}
                  <Pressable
                    onPress={() => handleIconPress(item.id, item.price)}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  >
                    {/* Icon Image */}
                    <Image
                      source={item.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: 'white',
                        opacity: unlockedItems.includes(item.id) ? 1 : 0.25,
                      }}
                      resizeMode='cover'
                    />
                    {/* Lock Image */}
                    {!unlockedItems.includes(item.id) && (
                      <Image
                        source={require('../../assets/images/bonsai_tree_icons/bonsai_tree_locked_icon.png')}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode='cover'
                      />
                    )}
                  </Pressable>
                  {/* Price Container */}
                  <View
                    style={{
                      marginTop: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 10,
                    }}
                  >
                    <Text
                      style={
                        {
                          ...Fonts.sofiaProLight[Platform.OS],
                          fontSize: 20,
                        } as TextStyle
                      }
                    >
                      {item.price}
                    </Text>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        marginBottom: 5,
                      }}
                    >
                      <Image
                        source={require('../../assets/images/bonsai_tree_icons/bonsai_price_icon.png')}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode='contain'
                      />
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  overlayImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // #F9F9F9
    marginBottom: 80, // @TODO: Is this right?
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    backgroundColor: 'transparent', // #F9F9F9
  },
  headersContainer: {
    position: 'relative',
    width: windowWidth,
    marginVertical: 40,
    paddingHorizontal: 30,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    marginTop: 5,
  } as TextStyle,
  bonsaiTreeStatesContainer: {
    position: 'absolute',
    height: 100,
    width: 310,
    bottom: -50,
    left: '50%',
    transform: [{ translateX: -155 }], // -155 = -width / 2
    borderRadius: 30,
    backgroundColor: '#C1DEBE',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 25,
  },
  stateContainer: {
    width: 65,
    height: 65,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: '#F9F9F9', // fallback
  },
});
