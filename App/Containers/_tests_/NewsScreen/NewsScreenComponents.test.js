import React from 'react';
import { shallow } from 'enzyme';
import { FlatList, Image } from 'react-native';
import GridList from '../../NewsScreen/NewsScreenComponents';

describe('NewsScreen', () => {
  const props = {};

  it('Should render with default props', () => {
    const wrapper = shallow(<GridList {...props} />);
    wrapper.find(FlatList).at(0).props().refreshControl.props.onRefresh();
    wrapper.find(FlatList).at(0).props().onEndReached();
    wrapper.find(FlatList).at(0).props().keyExtractor({}, 1);
    expect(wrapper.find(FlatList)).toHaveLength(1);
  });

  it('Should show image when item have urlToImage', () => {
    const wrapper = shallow(<GridList {...props} />);
    const item = {
      index: 0,
      urlToImage: 'image.jpg',
      title: 'Test',
    };
    const itemComponent = wrapper.find(FlatList).at(0).props().renderItem({
      item,
    });
    expect(itemComponent.props.children[0].props.children.type).toEqual(Image);
    expect(itemComponent.props.children[0].props.children.props.source.uri)
      .toEqual(item.urlToImage);
  });

  it('Should not show image when item have urlToImage', () => {
    const wrapper = shallow(<GridList {...props} />);
    const item = {
      index: 0,
      title: 'Test',
    };
    const itemComponent = wrapper.find(FlatList).at(0).props().renderItem({
      item,
    });
    expect(itemComponent.props.children[0].props.children).toBeNull();
  });
});
