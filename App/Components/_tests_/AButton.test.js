import React from 'react';
import { shallow } from 'enzyme';
import {
  Button,
  Icon,
} from 'native-base';
import AButton, {
  FILTER_CANCEL_TEXT,
} from '../AButton';

describe('AButton', () => {
  const props = {
    onPressFn: jest.fn(),
  };
  it('Should render with default props', () => {
    const wrapper = shallow(<AButton />);
    wrapper.find(Button).at(0).props().onPress();
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).at(0).props().children).toBeUndefined();
  });

  it('Should call onPressFn function when press the button', () => {
    const wrapper = shallow(<AButton {...props} />);
    wrapper.find(Button).at(0).props().onPress();
    expect(props.onPressFn).toBeCalled();
  });

  describe('AButton.Filter', () => {
    const filterProps = {
      filterActive: false,
      filterList: [],
    };

    it('Should render with default props', () => {
      const wrapper = shallow(<AButton.Filter {...filterProps} />);
      const pressResult = wrapper.find(AButton).at(0).props().onPressFn();
      expect(wrapper.find(AButton)).toHaveLength(1);
      expect(wrapper.find(Icon)).toHaveLength(0);
      expect(pressResult).toBeNull();
    });

    it('Should render filter icon when set filterActive to true', () => {
      const wrapper = shallow(<AButton.Filter {...filterProps} />);
      wrapper.setProps({
        filterActive: true,
      });
      wrapper.update();
      expect(wrapper.find(Icon)).toHaveLength(1);
      expect(wrapper.find(Icon).at(0).props().name).toEqual('filter');
    });

    it('Should action options equal filter list with cancel button when set filterList', () => {
      const wrapper = shallow(<AButton.Filter {...filterProps} />);
      const filterList = ['a', 'b', 'c'];
      wrapper.setProps({
        filterList,
      });
      wrapper.update();
      const ActionSheet = wrapper.find(AButton).at(0).props().onPressFn();
      ActionSheet.indexPress(0);
      const expectResult = [
        ...filterList,
        FILTER_CANCEL_TEXT,
      ];
      expect(ActionSheet.props.options).toEqual(expectResult);
    });

    it('Should call onPressFn when set filterList and onPressFn and press one filter item', () => {
      const filterPropsNew = {
        ...filterProps,
        onPressFn: jest.fn(),
      };
      const wrapper = shallow(<AButton.Filter {...filterPropsNew} />);
      const filterList = ['a', 'b', 'c'];
      wrapper.setProps({
        filterList,
      });
      wrapper.update();
      const ActionSheet = wrapper.find(AButton).at(0).props().onPressFn();
      ActionSheet.indexPress(0);
      expect(filterPropsNew.onPressFn).toBeCalled();
    });
  });
});
