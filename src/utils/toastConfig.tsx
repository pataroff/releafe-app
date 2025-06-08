import { TextStyle } from 'react-native';

import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';

const sharedStyles = {
  container: {
    borderRadius: 10,
    minHeight: 80,
    paddingVertical: 10,
    borderLeftWidth: 10,
  },
  content: {
    paddingHorizontal: 15,
    rowGap: 5,
  },
  text1: {
    fontFamily: 'SofiaProBold',
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
  text2: {
    fontFamily: 'SofiaProLight',
    fontSize: 14,
    color: '#333',
  } as TextStyle,
};

const createToast =
  (
    Component: typeof BaseToast,
    borderColor: string,
    height?: number
  ): ToastConfig[string] =>
  (props: BaseToastProps) =>
    (
      <Component
        {...props}
        style={{
          ...sharedStyles.container,
          borderLeftColor: borderColor,
          minHeight: height ?? sharedStyles.container.minHeight,
        }}
        contentContainerStyle={sharedStyles.content}
        text1Style={sharedStyles.text1}
        text2Style={sharedStyles.text2}
        text2NumberOfLines={3}
      />
    );

export const toastConfig: ToastConfig = {
  success: createToast(BaseToast, '#A9C1A1'),
  info: createToast(BaseToast, '#4da6ff'),
  error: createToast(ErrorToast, 'red'),
  longError: createToast(ErrorToast, 'red', 90),
};
