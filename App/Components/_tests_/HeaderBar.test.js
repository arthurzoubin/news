import React from 'react';
import { shallow } from 'enzyme';
import {
  Title,
} from 'native-base';
import HeaderBar from '../HeaderBar';
import AButton from '../AButton';

describe('HeaderBar', () => {
  it('Should render with default props', () => {
    const wrapper = shallow(<HeaderBar />);
    expect(wrapper.find(AButton.Filter)).toHaveLength(1);
    wrapper.find(AButton.Filter).at(0).props().onPressFn();
    expect(wrapper.find(Title)).toHaveLength(1);
    expect(wrapper.find(Title).at(0).props.children).toBeUndefined();
  });
});
