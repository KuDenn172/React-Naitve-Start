import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IconX} from '@tabler/icons-react-native';
import {COLORS} from '~/assets';
import CButton from './CButton';

export default memo(
  forwardRef(function ModalContain(
    {
      children,
      onClose,
      visible,
      noClose,
      isFullScreen,
      isInWeb,
      style,
      styleWrapper,
      isKeyboard,
      showBtnClose = true,
    },
    ref,
  ) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(visible);
    }, [visible]);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setIsOpen(true);
        },
        close: () => {
          setIsOpen(false);
        },
      }),
      [],
    );

    const {top} = useSafeAreaInsets();
    if (!isOpen) {
      return null;
    }
    return (
      <Modal
        transparent
        animationType={isInWeb ? 'none' : 'fade'}
        visible={isOpen}
        onRequestClose={() => {
          if (!noClose) {
            setIsOpen(false);
            onClose && onClose(false);
          }
        }}>
        <TouchableWithoutFeedback
          disabled={!isKeyboard}
          onPress={() => Keyboard.dismiss()}
          accessible={false}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              padding: isFullScreen ? 0 : 20,
              ...styleWrapper,
            }}>
            <TouchableOpacity
              disabled={noClose}
              activeOpacity={1}
              onPress={() => {
                setIsOpen(false);

                onClose && onClose(false);
              }}
              style={{
                ...StyleSheet.absoluteFill,
                backgroundColor: COLORS.overlay,
              }}
            />
            <View
              style={[
                styles.children,
                isFullScreen && {flex: 1, borderRadius: 0, paddingTop: top},
                style,
              ]}>
              {showBtnClose && !noClose && (
                <View style={styles.iconClose}>
                  <CButton.Icon
                    Icon={IconX}
                    onPress={() => {
                      setIsOpen(false);
                      onClose && onClose(false);
                    }}
                  />
                </View>
              )}
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }),
);

const styles = StyleSheet.create({
  children: {
    rowGap: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 14,
    width: '100%',
    maxWidth: 400,
  },
  iconClose: {
    position: 'absolute',
    right: 4,
    zIndex: 9,
  },
});
