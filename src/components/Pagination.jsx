import React, {memo, useMemo, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES} from '~/assets';
import CText from './CText';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react-native';

const PageBox = memo(({onPress, children, disabled, style}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    activeOpacity={0.7}
    style={[styles.styleView, disabled && styles.disabledView, style]}>
    {children}
  </TouchableOpacity>
));

const Pagination = ({
  totalData = 0,
  pageSize = 10,
  onChange = () => {},
  currentPage = 0,
  styleWrapper,
}) => {
  const [page, setPage] = useState(1);

  const _currentPage = currentPage || page;

  const countPage = useMemo(
    () => Math.ceil(totalData / pageSize),
    [totalData, pageSize],
  );

  const arrOfCurrButtons = useMemo(() => {
    const numberOfPages = [];
    for (let i = 1; i <= countPage; i++) {
      numberOfPages.push(i);
    }

    if (numberOfPages.length < 8) {
      return numberOfPages;
    } else if (_currentPage >= 1 && _currentPage < 5) {
      return [1, 2, 3, 4, 5, '...', numberOfPages.length];
    } else if (_currentPage > numberOfPages.length - 4) {
      const sliced = numberOfPages.slice(numberOfPages.length - 5);
      return [1, '...', ...sliced];
    } else {
      const sliced1 = numberOfPages.slice(_currentPage - 2, _currentPage);
      const sliced2 = numberOfPages.slice(_currentPage, _currentPage + 1);

      return [1, '...', ...sliced1, ...sliced2, '...', numberOfPages.length];
    }
  }, [_currentPage, countPage]);

  const handlePageChange = useCallback(
    value => {
      onChange(value);
      setPage(value);
    },
    [onChange],
  );

  if (countPage <= 1) return null;

  return (
    <View style={[styles.paging, styleWrapper]}>
      <PageBox onPress={() => handlePageChange(1)} disabled={_currentPage <= 1}>
        <IconChevronsLeft
          size={SIZES.large}
          color={_currentPage <= 1 ? COLORS.grey : COLORS.black}
        />
      </PageBox>

      <PageBox
        onPress={() => handlePageChange(_currentPage - 1)}
        disabled={_currentPage <= 1}>
        <IconChevronLeft
          size={SIZES.large}
          color={_currentPage <= 1 ? COLORS.grey : COLORS.black}
        />
      </PageBox>

      {arrOfCurrButtons.map((item, index) => {
        const focus = _currentPage === item;
        return item === '...' ? (
          <CText
            key={index}
            weight="semiBold"
            color={COLORS.primary}
            size={SIZES.large}
            textAlign="center"
            style={styles.ellipsis}>
            {item}
          </CText>
        ) : (
          <PageBox
            key={index}
            onPress={() => handlePageChange(item)}
            style={focus && styles.currentNumberPage}>
            <CText
              size={SIZES.medium}
              weight="semiBold"
              color={focus ? COLORS.primary : COLORS.black}>
              {item}
            </CText>
          </PageBox>
        );
      })}

      <PageBox
        onPress={() => handlePageChange(_currentPage + 1)}
        disabled={_currentPage === countPage}>
        <IconChevronRight
          size={SIZES.large}
          color={_currentPage === countPage ? COLORS.grey : COLORS.black}
        />
      </PageBox>

      <PageBox
        onPress={() => handlePageChange(countPage)}
        disabled={_currentPage === countPage}>
        <IconChevronsRight
          size={SIZES.large}
          color={_currentPage === countPage ? COLORS.grey : COLORS.black}
        />
      </PageBox>
    </View>
  );
};

const styles = StyleSheet.create({
  paging: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  currentNumberPage: {
    borderWidth: 1,
  },
  styleView: {
    minWidth: 28,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 3,
    alignItems: 'center',
    borderColor: COLORS.primary,
  },
  disabledView: {
    backgroundColor: '#eaeaea',
  },
  ellipsis: {
    width: 20,
    height: 20,
  },
});

export default memo(Pagination);
