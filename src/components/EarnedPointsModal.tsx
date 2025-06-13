import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Image,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';

import Feather from '@expo/vector-icons/Feather';
import { useGamification } from '../context/GamificationContext';

interface EarnedPointsModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  points: number;
  goalCompleted?: boolean;
}

export const EarnedPointsModal: React.FC<EarnedPointsModalProps> = ({
  visible,
  setVisible,
  points,
  goalCompleted,
}) => {
  const { addPoints } = useGamification();

  const handleClose = () => {
    setVisible(!visible);
    addPoints(points);
  };

  return (
    <View>
      <Modal animationType='fade' transparent={true} visible={visible}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <Pressable
              style={{ position: 'absolute', top: 20, right: 20 }}
              onPress={handleClose}
            >
              <Feather name='x-circle' size={24} color='gray' />
            </Pressable>

            <Text style={styles.title}>Mooi gedaan!</Text>
            <Text style={styles.description}>
              {goalCompleted
                ? 'Je hebt je dagboek ingevuld én één of meerdere persoonlijke doelen behaald. Daarvoor heb je punten verdiend.'
                : 'Je hebt punten verdiend door aandacht te geven aan je mentale welzijn.'}
            </Text>

            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logo_releafe_05.png')}
                style={styles.logo}
                resizeMode='contain'
              />
            </View>

            <Text style={styles.pointsText}>+ {points} RP</Text>

            <Text style={styles.message}>
              Elke stap telt. Blijf op jouw manier vooruitgaan.
            </Text>

            <Pressable style={styles.collectButton} onPress={handleClose}>
              <Text style={styles.collectText}>Punten verzamelen</Text>
            </Pressable>
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
    alignItems: 'center',
  },
  title: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#333',
  } as TextStyle,
  description: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  } as TextStyle,
  logoContainer: {
    marginTop: 10,
    borderRadius: 99,
    backgroundColor: 'white',
    borderColor: 'gainsboro',
    borderWidth: 1,
    width: 80,
    height: 80,
    padding: 15,
  },
  logo: {
    width: '100%',
    height: '100%',
    paddingBottom: 5,
  },
  pointsText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  message: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  } as TextStyle,
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
