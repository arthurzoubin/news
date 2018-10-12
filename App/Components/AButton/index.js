// @flow
import React from 'react';
import {
  Icon,
  Button,
  ActionSheet,
} from 'native-base';
import styles from './styles';

const STATIC_TEXT = {
  actionSheetTitle: 'News agency',
};

export const FILTER_CANCEL_TEXT = 'Cancel';

type Props = {
  children?: any,
  onPressFn?: Function,
};

type FilterProps = {
  filterActive?: boolean,
  filterList?: Array,
  onPressFn?: Function,
};

const AButton = ({
  onPressFn,
  children,
}: Props) => (
  <Button
    style={styles.button}
    onPress={() => onPressFn()}
  >
    {children}
  </Button>
);

const renderActionSheet = (filterList: Array, filterPressFn: Function) => {
  if (filterList.length > 0) {
    const filters = [
      ...filterList,
      FILTER_CANCEL_TEXT,
    ];
    const cancelButtonIndex = Number(filters.length - 1);
    return ActionSheet.show(
      {
        options: filters,
        title: STATIC_TEXT.actionSheetTitle,
        cancelButtonIndex,
      },
      buttonIndex => filterPressFn(buttonIndex),
    );
  }
  return null;
};

AButton.Filter = ({
  filterActive,
  filterList,
  onPressFn,
}: FilterProps) => (
  <AButton
    onPressFn={() => renderActionSheet(filterList, onPressFn)}
  >
    { filterActive ? <Icon type="MaterialCommunityIcons" name="filter" style={styles.filterIcon} /> : null}
  </AButton>
);

AButton.defaultProps = {
  onPressFn: () => {},
};

AButton.Filter.defaultProps = {
  filterActive: false,
  filterList: [],
  onPressFn: () => {},
};

export default AButton;
