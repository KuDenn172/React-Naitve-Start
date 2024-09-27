import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CText from './CText';
import CButton from './CButton';
import { COLORS } from '~/assets';
import { NoResultSearch } from '~/assets/images/svg';

export default function EmptyData({desc, noDesc, style, titleBtn, onPress}) {
  return (
    <View
      style={{
        alignItems: 'center',
        rowGap: (10),
        paddingHorizontal: (12),
        marginTop: '18%',
        ...style,
      }}>
      <NoResultSearch />
      {!noDesc && (
        <CText weight="semiBold" color={COLORS.grey} textAlign="center">
          {desc || 'Empty Data'}
        </CText>
      )}
      {titleBtn && (
        <View>
          <CButton title={titleBtn} onPress={onPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
