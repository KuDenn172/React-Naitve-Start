import {IconEye, IconEyeOff, IconXboxXFilled} from '@tabler/icons-react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '~/assets';
import CButton from './CButton';

type CInputProps = TextInputProps & {
  password?: boolean;
  Icon?: React.JSX.Element;
  onPressIcon?: () => void;
  propsIcon?: any;
  styleWrap?: ViewStyle;
  sizeInput?: 'small' | 'medium' | 'large';
};

export default function CInput({
  sizeInput = 'medium',
  password,
  Icon,
  onPressIcon,
  propsIcon,
  styleWrap,
  ...props
}: CInputProps) {
  const [viewPass, setViewPass] = useState(!!password);
  const [isText, setIsText] = useState(false);

  const IconComponent: any =
    Icon || (password ? (!viewPass ? IconEye : IconEyeOff) : null);

  const inputRef = useRef<TextInput>(null);

  const _onPressIcon = () => {
    if (onPressIcon) {
      onPressIcon();
    }

    if (password) {
      setViewPass(prev => !prev);
    }
  };

  const sizeInputStyle =
    sizeInput === 'small'
      ? {height: 46, fontSize: SIZES.xMedium}
      : sizeInput === 'medium'
      ? {height: 50, fontSize: 15}
      : {height: 55, fontSize: SIZES.medium};

  const handleTextChange = useCallback(
    (value: string) => {
      setIsText(!!value);
      if (props.onChangeText) {
        props.onChangeText(value);
      }
    },
    [props.onChangeText],
  );

  const handleClear = useCallback(() => {
    inputRef.current?.clear();
    setIsText(false);
    if (props.onChangeText) {
      props.onChangeText('');
    }
  }, [props.onChangeText]);

  return (
    <View style={[styles.inputContainer, styleWrap]}>
      <TextInput
        ref={inputRef}
        placeholderTextColor={COLORS.grey}
        secureTextEntry={viewPass}
        {...props}
        style={[styles.input, sizeInputStyle, props?.style]}
        onChangeText={handleTextChange}
      />

      {IconComponent && (
        <CButton.Icon
          noColor={false}
          onPress={_onPressIcon}
          Icon={IconComponent}
          disabled={!onPressIcon && !password}
          stroke={password ? COLORS.white : COLORS.transparent}
          fill={password ? COLORS.transparent : COLORS.grey}
          {...propsIcon}
        />
      )}

      {isText && (
        <CButton.Icon
          noColor={false}
          onPress={handleClear}
          Icon={IconXboxXFilled}
          fill={COLORS.grey}
          stroke={COLORS.transparent}
          size={18}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 8,
    height: 46,
    fontSize: SIZES.xMedium,
    fontFamily: FONTS.medium,
    fontWeight: '500',
  },
});
