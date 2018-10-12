// @flow

import React from 'react';
import {
  Item,
  Input,
  Icon,
} from 'native-base';
import styles from '../Styles/SearchBarStyles';

const DEFAULT_PLACEHOLDER = 'Search';

type Props = {
  initialSearch?: boolean,
  onSubmitEditing?: Function,
};

class SearchBar extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialSearch) {
      this.setState({
        inputText: '',
      });
    }
  }

  _onChangeInputText(value: string) {
    this.setState({
      inputText: value,
    });
  }

  _handleSubmit() {
    const { onSubmitEditing } = this.props;
    const { inputText } = this.state;
    if (onSubmitEditing) {
      onSubmitEditing(inputText);
    }
  }

  render() {
    const { inputText } = this.state;
    return (
      <Item>
        <Icon name="ios-search" style={styles.icon} />
        <Input
          placeholder={DEFAULT_PLACEHOLDER}
          value={inputText}
          onChangeText={value => this._onChangeInputText(value)}
          onSubmitEditing={() => this._handleSubmit()}
        />
      </Item>
    );
  }
}

SearchBar.defaultProps = {
  initialSearch: false,
  onSubmitEditing: null,
};

export default SearchBar;
