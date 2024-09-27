import {
  IconAlertCircleFilled
} from '@tabler/icons-react-native';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import {
  StyleSheet,
  TextInputProps,
  View
} from 'react-native';
import { COLORS, SIZES } from '~/assets';
import CInput from './CInput';
import CText, { CTextProps } from './CText';

type CInputFormProps = TextInputProps & {
  control: Control<FieldValues>;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label: string;
  propsTextLabel?: CTextProps;
};

export default function CInputForm({
  control,
  name,
  rules,
  label,
  propsTextLabel,
  ...props
}: CInputFormProps) {
  const form = useForm();
  return (
    <Controller
      control={control || form.control}
      rules={rules}
      name={name || ''}
      defaultValue={control && props?.defaultValue}
      render={({
        field: {onBlur, onChange, value},
        fieldState: {error, invalid},
      }) => (
        <View style={styles.inputContainer}>
          {label && (
            <CText weight="semiBold" {...propsTextLabel}>
              {label}
            </CText>
          )}

          <CInput
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
      )}
    />
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    rowGap: 8,
  },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 6,
  },
});
