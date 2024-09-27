import React, {memo} from 'react';
import {ColorValue, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {COLORS, FONTS, SIZES} from '~/assets';

export type CTextProps = {
  children: React.ReactNode;
  isShadow?: boolean;
  isAnimated?: boolean;
  shaDowColor?: string;
  color?: ColorValue;
  size?: number;
  weight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
} & TextProps;

export default memo(function CText({
  children,
  weight = 'regular',
  isShadow,
  shaDowColor,
  size,
  color,
  textAlign,
  ...props
}: CTextProps) {
  const textWeight: TextStyle =
    weight === 'light'
      ? {fontFamily: FONTS.light, fontWeight: '300'}
      : weight === 'regular'
      ? {fontFamily: FONTS.regular, fontWeight: '400'}
      : weight === 'semiBold'
      ? {fontFamily: FONTS.semiBold, fontWeight: '600'}
      : weight === 'bold'
      ? {fontFamily: FONTS.bold, fontWeight: '700'}
      : {fontFamily: FONTS.medium, fontWeight: '500'};

  return (
    <Text
      {...props}
      style={[
        styles.text,
        isShadow && {...styles.shaDow, textShadowColor: shaDowColor},
        {fontSize: size},
        color && {color: color},
        textAlign && {textAlign},
        textWeight,
        props.style,
      ]}>
      {children}
    </Text>
  );
});

const styles = StyleSheet.create({
  text: {
    fontSize: SIZES.xMedium,
    color: COLORS.white,
  },
  shaDow: {
    textShadowOffset: {width: 0, height: 1.5},
    textShadowRadius: 2,
  },
});
