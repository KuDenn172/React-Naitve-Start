import {Dimensions} from 'react-native';
import {COLORS} from '.';

const {height, width} = Dimensions.get('window');

export const WIDTH = {
  widthScreen: width,
  heightScreen: height,
};

export const SIZES = {
  xSmall: 10,
  xxSmall: 6,
  small: 12,
  xMedium: 14,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

export const FONTS = {
  light: 'Quicksand-Light',
  regular: 'Quicksand-Regular',
  medium: 'Quicksand-Medium',
  semiBold: 'Quicksand-SemiBold',
  bold: 'Quicksand-Bold',
};

export const SHADOW = {
  shadowColor: '#333',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
};
export const MessageStyle = {
  success: {
    style: {backgroundColor: '#26A17B'},
    duration: 3000,
    titleStyle: SIZES.medium,
  },
  error: {
    style: {backgroundColor: '#FB7181'},
    duration: 3000,
    titleStyle: SIZES.medium,
  },
  warning: {
    style: {backgroundColor: COLORS.yellow},
    duration: 3000,
    titleStyle: SIZES.medium,
  },
};
