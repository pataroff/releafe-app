import { SetStateAction } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { SelectedAchievement } from '../types';

import { useGamification } from '../context/GamificationContext';

import Feather from '@expo/vector-icons/Feather';

const lockedIcon = require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Badge nog te verdienen.png');

type AchievementModalMode = 'view' | 'unlocked';

interface AchievementModalProps {
  achievementModalVisible: boolean;
  setAchievementModalVisible: React.Dispatch<SetStateAction<boolean>>;
  selectedAchievement: SelectedAchievement;
  isAchievementUnlocked: boolean;
  mode?: AchievementModalMode;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({
  achievementModalVisible,
  setAchievementModalVisible,
  selectedAchievement,
  isAchievementUnlocked,
  mode,
}) => {
  const { addPoints } = useGamification();
  const { icon, points, description, parentTitle } = selectedAchievement;

  const handleCollect = () => {
    addPoints(points);
    setAchievementModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={achievementModalVisible}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <Pressable
              style={{ position: 'absolute', top: 20, right: 20 }}
              onPress={() =>
                mode === 'unlocked'
                  ? handleCollect()
                  : setAchievementModalVisible(!achievementModalVisible)
              }
            >
              <Feather name='x-circle' size={24} color='gray' />
            </Pressable>

            {/* Headers */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Text style={styles.modalTitle}>
                {isAchievementUnlocked ? 'Gefeliciteerd!' : 'Hmmm...'}
              </Text>

              <Text style={styles.modalDescription}>
                {isAchievementUnlocked
                  ? 'Je hebt een badge behaald.'
                  : 'Deze badge heb je nog niet behaald, maar je bent goed op weg!'}
              </Text>

              <Image
                style={{
                  width: 170,
                  height: 170,
                  marginVertical: 20,
                }}
                source={isAchievementUnlocked ? icon : lockedIcon}
              />

              <Text style={styles.title}>
                {parentTitle} (+{points} RP)
              </Text>

              <Text style={styles.description}>{description}</Text>

              {mode === 'unlocked' && isAchievementUnlocked && (
                <View style={{ marginTop: 20 }}>
                  <Pressable
                    style={styles.collectButton}
                    onPress={() => handleCollect()}
                  >
                    <Text style={styles.collectText}>Punten verzamelen</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    gap: 20,
  },
  modalTitle: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    lineHeight: 30,
    color: '#333',
  } as TextStyle,
  modalDescription: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22, // 24 in Figma
  } as TextStyle,
  title: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 18,
    lineHeight: 30,
    color: '#5C6B57',
  } as TextStyle,
  description: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    color: '#333333',
  } as TextStyle,
  buttonWrapper: {
    gap: 15,
  },
  collectButton: {
    marginTop: 10,
    backgroundColor: '#C1DEBE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  collectText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    color: '#333',
  } as TextStyle,
});
