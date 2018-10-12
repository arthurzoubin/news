import React from 'react';
import { shallow } from 'enzyme';
import {
  Icon,
  Input,
} from 'native-base';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('Should render with default props', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find(Icon)).toHaveLength(1);
    expect(wrapper.find(Icon).at(0).props().name).toEqual('ios-search');
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  it('Should still display test words when input some words first and later set initialSearch to false', () => {
    const wrapper = shallow(<SearchBar />);
    const testWords = 'Test';
    wrapper.find(Input).at(0).props().onChangeText(testWords);
    expect(wrapper.instance().state.inputText).toEqual(testWords);
    wrapper.setProps({
      initialSearch: false,
    });
    wrapper.update();
    expect(wrapper.instance().state.inputText).toEqual(testWords);
  });

  it('Should display empty when input some words first and later set initialSearch to true', () => {
    const wrapper = shallow(<SearchBar />);
    const testWords = 'Test';
    wrapper.find(Input).at(0).props().onChangeText(testWords);
    expect(wrapper.instance().state.inputText).toEqual(testWords);
    wrapper.setProps({
      initialSearch: true,
    });
    wrapper.update();
    expect(wrapper.instance().state.inputText).toEqual('');
  });

  it('Should call onSubmitEditing when set onSubmitEditing in props', () => {
    const wrapper = shallow(<SearchBar />);
    const onSubmitEditing = jest.fn();
    wrapper.setProps({
      onSubmitEditing,
    });
    wrapper.update();
    wrapper.find(Input).at(0).props().onSubmitEditing();
    expect(onSubmitEditing).toBeCalled();
  });

  it('Should not call onSubmitEditing when do not set onSubmitEditing in props', () => {
    const wrapper = shallow(<SearchBar />);
    const onSubmitEditing = jest.fn();
    wrapper.find(Input).at(0).props().onSubmitEditing();
    expect(onSubmitEditing).not.toBeCalled();
  });
});
