import { useNavigation } from '@react-navigation/native';
import { IconArrowLeft, IconUser } from '@tabler/icons-react-native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, images, SIZES } from '../assets';
import CButton from './CButton';
import CText from './CText';

export default function HeaderBar({back, navigation, options, route}) {
  const {goBack, navigate} = useNavigation();
  const {} = useSafeAreaInsets();

  if (!options?.headerShown) return null;

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {(options?.isGoBack || (!!back && !options?.headerLeft)) && (
          <CButton.Icon
            Icon={IconArrowLeft}
            noColor={false}
            onPress={() => {
              goBack();
            }}
            style={options?.headerIconStyle}
            color={options?.headerIconStyle?.color || COLORS.white}
          />
        )}

        <View style={styles.headerTitleLeft}>
          <View style={styles.headerTitle}>
            <CText weight="bold" size={SIZES.large}>
              {options?.headerTitle || options?.title}
            </CText>
            {(route?.name === 'Login' || route?.name === 'SignUp' )&& (
              <IconUser size={SIZES.large} color={COLORS.white} />
            )}
          </View>

          <CText weight="medium" size={SIZES.xMedium} color={COLORS.grey}>
            {options?.desc}
          </CText>
        </View>
      </View>

      {options?.headerRight ? (
        options?.headerRight()
      ) : (
        <Image
          // source={images.logo}
          style={{width: 40, height: 40}}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.black,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  headerTitleLeft: {
    rowGap: 3,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
});
