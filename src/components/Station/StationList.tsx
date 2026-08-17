import React, { useRef, useEffect } from 'react';

import { FlatList } from 'react-native';

import StationCard from './StationCard';

import { Station } from '../../types/station';

interface Props {
  data: Station[];

  selectedStation?: Station | null;

  onPress?: (station: Station) => void;
}

export default function StationList({
  data,

  selectedStation,

  onPress,
}: Props) {
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!selectedStation) {
      return;
    }

    const index = data.findIndex(item => item.id === selectedStation.id);

    if (index >= 0) {
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index,

          animated: true,
        });
      }, 300);
    }
  }, [selectedStation, data]);

  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <StationCard
          station={item}
          selected={selectedStation?.id === item.id}
          onPress={onPress}
        />
      )}
      onScrollToIndexFailed={info => {
        listRef.current?.scrollToOffset({
          offset: info.averageItemLength * info.index,

          animated: true,
        });
      }}
    />
  );
}
