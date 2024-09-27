import {
  IconCaretDownFilled,
  IconCaretUpFilled,
} from '@tabler/icons-react-native';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../assets';
import CText from './CText';
import EmptyData from './EmptyData';
import Pagination from './Pagination';
import {Skeleton} from './Skeleton';

export default function Table({
  data,
  columns = [],
  onPress,
  keysRender = [],
  count,
  setPage,
}) {
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [sortedData, setSortedData] = useState(null);
  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const sortTable = column => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc';
    const key = column;
    const sortedByData = _.orderBy(data, [key], [newDirection]);

    setSelectedColumn(column);
    setDirection(newDirection);
    setSortedData(sortedByData);
  };

  const widthColumn = 100 / (columns.length - 0.4);

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        const IconSort =
          direction === 'desc' ? IconCaretDownFilled : IconCaretUpFilled;

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            style={[
              styles.columnHeader,
              {width: index === 0 ? '18%' : widthColumn + '%'},
            ]}
            onPress={() => sortTable(keysRender[index])}>
            <CText weight="bold">
              {column + ' '}
              {selectedColumn === keysRender[index] && (
                <IconSort
                  fill={COLORS.primary}
                  color={COLORS.primary}
                  size={SIZES.xSmall}
                />
              )}
            </CText>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={tableHeader}
        ListFooterComponent={
          <Pagination
            pageSize={10}
            totalData={count}
            onChange={num => setPage(num)}
          />
        }
        ListEmptyComponent={<EmptyData />}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          rowGap: 8,
          paddingBottom: bottom,
        }}
        renderItem={({item, index}) => {
          const keys = keysRender || Object.keys(item);
          const time = dayjs(item?.time).format('DD-MM-YYYY, HH:mm');

          return !item?.time ? (
            <Skeleton  height={50}/>
          ) : (
            <TouchableOpacity
              key={`key-${index}-${item?.time}`}
              activeOpacity={0.7}
              disabled={!onPress}
              onPress={() => onPress({...item, time})}
              style={{
                ...styles.tableRow,
                backgroundColor:
                  index % 2 === 0
                    ? COLORS.secondary + '90'
                    : COLORS.secondary + 'CF',
              }}>
              {keys.map((key, i) => {
                return (
                  <CText
                    key={`key-${index}-${key}`}
                    weight={i === 0 ? 'bold' : 'regular'}
                    style={{
                      width: i === 0 ? '18%' : widthColumn + '%',
                      textAlign: 'center',
                    }}>
                    {key === 'time' ? time : item[key]}
                  </CText>
                );
              })}
            </TouchableOpacity>
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    columnGap: 6,
  },
  tableRow: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    columnGap: 6,
  },
  columnHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
