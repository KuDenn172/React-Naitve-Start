import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OTPInputView, {
  InputProps,
  OTPInputViewState,
} from '@twotalltotems/react-native-otp-input';
import {COLORS, FONTS, SIZES} from '~/assets';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import CText, {CTextProps} from './CText';
import {IconAlertCircleFilled} from '@tabler/icons-react-native';

type OTPInputProps = InputProps & {
  control: Control<FieldValues>;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label: string;
  defaultValue: any;
  propsTextLabel?: CTextProps;
};

export default function OTPInput({
  control,
  name,
  rules,
  label,
  defaultValue,
  propsTextLabel,
  ...props
}: OTPInputProps) {
  const form = useForm();

  return (
    <Controller
      control={control || form.control}
      rules={rules}
      name={name || ''}
      defaultValue={defaultValue}
      render={({
        field: {onBlur, onChange, value},
        fieldState: {error, invalid},
      }) => {
        return (
          <View style={styles.inputContainer}>
            {label && (
              <CText weight="semiBold" {...propsTextLabel}>
                {label}
              </CText>
            )}

            {/* <CInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        autoCapitalize="none"
        styleWrap={
          invalid ? {
            borderWidth: 1,
              borderColor: COLORS.red + '50',
            }
          : {}
        }
        {...props}
      /> */}

            <OTPInputView
              style={{height: 60}}
              pinCount={6}
              code={value}
              onCodeChanged={onChange}
              autoFocusOnLoad
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                invalid && {
                  borderColor: COLORS.red + '50',
                },
              ]}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={() => {
                onBlur();
              }}
              keyboardType="default"
              selectionColor={COLORS.primary}
              {...props}
            />

            {invalid && (
              <View style={styles.errorBox}>
                <IconAlertCircleFilled
                  fill={COLORS.red}
                  size={SIZES.xMedium}
                  stroke={COLORS.transparent}
                  style={{
                    marginTop: 2,
                  }}
                />
                <CText
                  style={{
                    color: COLORS.red,
                    flex: 1,
                  }}>
                  {error?.message}
                </CText>
              </View>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    width: 52,
    height: 52,
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.cyan,
    borderWidth: 2,
  },

  inputContainer: {
    rowGap: 8,
  },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 6,
  },
});
