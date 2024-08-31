import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CustomProgressBarProps {
  progress: number;
  totalSteps: number;
}

export const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  progress,
  totalSteps,
}) => {
  const stepsToShow = progress === 4 ? totalSteps : 8;

  return (
    <View style={styles.container}>
      {Array.from({ length: stepsToShow }).map((_, index) => {
        const isFirstTwoSecondSmall = progress > 4 && index == 1;
        const isFirstTwoFirstSmall = progress > 4 && index == 0;
        const isLastTwoSecondSmall =
          (progress < 4 && index == stepsToShow - 1) ||
          (progress === 4 && index >= stepsToShow - 1);
        const isLastTwoFirstSmall =
          (progress < 4 && index == stepsToShow - 2) ||
          (progress === 4 && index >= stepsToShow - 2);
        const bothSidesSecondSmall =
          progress === 4 && (index == 1 || index >= stepsToShow - 1);
        const bothSidesFirstSmall =
          progress === 4 && (index == 0 || index >= stepsToShow - 2);

        return (
          <View
            key={index}
            style={[
              styles.circle,
              index === progress && styles.currentCircle,
              (isFirstTwoSecondSmall ||
                isLastTwoFirstSmall ||
                bothSidesSecondSmall) &&
                styles.smallCircle,
              (isFirstTwoFirstSmall ||
                isLastTwoSecondSmall ||
                bothSidesFirstSmall) &&
                styles.smallerCircle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  circle: {
    borderRadius: 99,
    width: 8,
    height: 8,
    backgroundColor: 'lightgray',
  },
  currentCircle: {
    backgroundColor: 'black',
  },
  smallCircle: {
    width: 7,
    height: 7, // Smaller size for specified circles
  },
  smallerCircle: {
    width: 5,
    height: 5,
  },
});

export default CustomProgressBar;
