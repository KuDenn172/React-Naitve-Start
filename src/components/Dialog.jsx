import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '~/assets';
import useDialog from '~/hooks/useDialog';
import {CButton, CText} from '~/components';
import ModalContain from './ModalContain';

export default function Dialog() {
  const {goBack} = useNavigation();
  const {
    isOpen,
    title,
    desc,
    textBtnOne,
    textBtnTwo,
    onReject,
    onConfirm,
    noGoBack,
    noClose,
    closeDialog,
  } = useDialog();

  const _onConfirm = async () => {
    onConfirm && onConfirm();
    closeDialog();
    !noGoBack && goBack();
  };

  const _onReject = async () => {
    onReject && onReject();
    closeDialog();
  };

  if (!isOpen) return null;

  return (
    <ModalContain
      visible={isOpen}
      noClose={noClose}
      onRequestClose={closeDialog}
      style={{
        backgroundColor: COLORS['gray-900'],
      }}>
      <View style={{rowGap: 6}}>
        {title && (
          <CText weight="semiBold" size={SIZES.medium}>
            {title}
          </CText>
        )}
        {desc && <CText>{desc}</CText>}
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 16,
          justifyContent: 'flex-end',
        }}>
        <CButton
          onPress={textBtnTwo ? _onReject : _onConfirm}
          // outline
          title={textBtnOne || 'Cancel'}
          btnSize="small"
          style={{flex: 0.3, height: 36}}
          textProps={{
            size: SIZES.xMedium,
          }}
        />
       {textBtnTwo && <CButton
          onPress={_onConfirm}
          title={textBtnTwo || 'OK'}
          btnSize="small"
          style={{flex: 0.3, height: 36}}
          textProps={{
            size: SIZES.xMedium,
          }}
        />}
      </View>
    </ModalContain>
  );
}

// ... styles remain unchanged

const styles = StyleSheet.create({
  lottie: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
});
