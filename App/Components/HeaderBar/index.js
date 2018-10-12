// @flow

import React from 'react';
import {
  Header,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import AButton from '../AButton';

import styles from '../Styles/HeaderBarStyles';

type Props = {
  title?: string,
  filterActive?: boolean,
  filterList?: Array,
  onFilterItemPressFn?: Function,
};

const HeaderBar = ({
  title,
  filterActive,
  filterList,
  onFilterItemPressFn,
}: Props) => (
  <Header>
    <Left />
    <Body style={styles.headerMiddle}>
      <Title>{title}</Title>
    </Body>
    <Right>
      <AButton.Filter
        filterActive={filterActive}
        filterList={filterList}
        onPressFn={onFilterItemPressFn}
      />
    </Right>
  </Header>
);

HeaderBar.defaultProps = {
  title: '',
  filterActive: false,
  filterList: [],
  onFilterItemPressFn: () => {},
};

export default HeaderBar;
