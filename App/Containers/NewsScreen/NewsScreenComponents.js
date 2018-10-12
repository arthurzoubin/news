// @flow

import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  Image,
  FlatList,
} from 'react-native';

import styles, {
  loaderColor,
} from '../Styles/NewsScreenStyles';

const DEFAULT_ITEMS_ROW = 2;

type GridListType = {
  data?: Array,
  fetching?: boolean,
  onPullFn?: Function,
  loadMoreFn?: Function,
};

type ItemProps = {
  item: Object,
}

const renderRefresher = (loadingStatus, onPullFn) => (
  <RefreshControl
    enabled
    colors={[loaderColor]}
    onRefresh={onPullFn}
    refreshing={loadingStatus}
  />
);

const renderItem = ({ item }: ItemProps) => (
  <View style={[styles.item]} key={item.index}>
    <View style={styles.itemImageWrapper}>
      {
        item.urlToImage ? (
          <Image source={{ uri: item.urlToImage }} style={styles.itemImage} />
        ) : null
      }
    </View>
    <Text
      style={styles.itemText}
      numberOfLines={2}
      ellipsizeMode="tail"
    >
      {item.title}
    </Text>
  </View>
);

const GridList = ({
  data,
  fetching,
  onPullFn,
  loadMoreFn,
}: GridListType) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    numColumns={DEFAULT_ITEMS_ROW}
    keyExtractor={(item, index) => index.toString()}
    refreshControl={renderRefresher(!!fetching, onPullFn)}
    onEndReached={loadMoreFn}
    onEndReachedThreshold={0.5}
  />
);

GridList.defaultProps = {
  data: [],
  fetching: false,
  onPullFn: () => {},
  loadMoreFn: () => {},
};

export {
  GridList as default,
};
