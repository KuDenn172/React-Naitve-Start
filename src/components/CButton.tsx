import {
  ActivityIndicator,
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import CText, { CTextProps } from './CText';
import {IconProps, IconQuestionMark} from '@tabler/icons-react-native';
import {COLORS, SIZES} from '~/assets';

type CButtonProps = {
  title: string;
  btnSize: 'small' | 'medium' | 'large';
  backgroundColor?: ColorValue;
  isLoading?: boolean;
  outline?: boolean;
  textProps?: CTextProps;
} & TouchableOpacityProps;

export default function CButton({
  title,
  btnSize = 'medium',
  backgroundColor = COLORS.primary,
  isLoading,
  outline,
  textProps,
  ...props
}: CButtonProps) {
  const btnSizeStyle =
    btnSize === 'small'
      ? {height: 46}
      : btnSize === 'medium'
      ? {height: 54}
      : {height: 60};

  const sizeText =
    btnSize === 'small'
      ? SIZES.medium
      : btnSize === 'medium'
      ? SIZES.large
      : SIZES.xLarge;

const _disabled = props.disabled || isLoading;

  return (
    <TouchableOpacity
      {...props}
      disabled={_disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        btnSizeStyle,
        {
          backgroundColor: backgroundColor,
          opacity: _disabled ? 0.5 : 1,
        },
        outline && styles.outline,
        props.style,
      ]}>
      {isLoading ? (
        <ActivityIndicator size={btnSize === 'small' ? 'small' : 'large'} color={COLORS.white} />
      ) : (
        <CText weight="bold" size={sizeText} color={ COLORS.white} {...textProps}>
          {title}
        </CText>
      )}
    </TouchableOpacity>
  );
}

export type ButtonIconProps = {
  Icon: React.JSX.Element;
  btnColor?: ColorValue;
  radius?: number;
  disabled?: boolean;
  noColor?: boolean;
  padding?: number;
  btnProps: TouchableOpacityProps;
} & IconProps;

function ButtonIcon({
  Icon = IconQuestionMark,
  btnProps,
  radius = 99,
  btnColor = COLORS.secondary,
  noColor = true,
  padding = 7,
  disabled,
  onPress,
  ...iconProps
}: ButtonIconProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          padding: padding,
          borderRadius: radius,
          backgroundColor: noColor ? 'transparent' : btnColor,
        },
        styles.buttonIcon,
      ]}
      {...btnProps}>
      <View>
        {Icon && (
          <Icon
            color={disabled ? COLORS['gray-500'] : COLORS.white}
            size={20}
            {...iconProps}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

CButton.Icon = ButtonIcon;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
});
