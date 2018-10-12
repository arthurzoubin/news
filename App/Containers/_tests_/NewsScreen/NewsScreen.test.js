import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';
import sinon from 'sinon';
import ConnectedNewsScreen from '../../NewsScreen';
import { NewsScreen } from '../../NewsScreen/NewsScreen';
import HeaderBar from '../../../Components/HeaderBar';
import SearchBar from '../../../Components/SearchBar';
import GridList from '../../NewsScreen/NewsScreenComponents';
import { NewsTypes } from '../../../Redux/NewsRedux';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mockStore = configureStore([]);

describe('NewsScreen', () => {
  const props = {
    navigation: {},
    fetchNews: jest.fn(),
    totalResults: 20,
  };
  const initialState = Immutable({
    news: {
      fetching: true,
      error: null,
      newsList: [],
      totalResults: 0,
      fetchingAgency: true,
      errorAgency: null,
      agency: [],
    },
  });
  const store = mockStore(initialState);

  it('Should render with default props', () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    expect(wrapper.find(HeaderBar)).toHaveLength(1);
    expect(wrapper.find(SearchBar)).toHaveLength(1);
    expect(wrapper.find(GridList)).toHaveLength(1);
  });

  it('Should refresh news list when click agency item exist in the agency list', async () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    wrapper.setProps({
      agency: [{
        name: 'a',
      }],
    });
    wrapper.update();
    const newWrapper = wrapper.setState({
      agencyList: ['a'],
    });
    newWrapper.instance()._refreshByParams = jest.fn();
    sinon.stub(NewsScreen.prototype, 'setState')
      .callsFake((newState, callback) => {
        if (callback) {
          callback();
        }
      });
    newWrapper.find(HeaderBar).at(0).props().onFilterItemPressFn(0);
    await sleep(10);
    expect(newWrapper.instance()._refreshByParams).toBeCalled();
    NewsScreen.prototype.setState.restore();
  });

  it('Should not refresh news list when click agency item do not exist in the agency list', async () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    wrapper.setProps({
      agency: [{
        name: 'a',
      }],
    });
    const newWrapper = wrapper.setState({
      agencyList: ['b'],
    });
    newWrapper.instance()._refreshByParams = jest.fn();
    sinon.stub(NewsScreen.prototype, 'setState')
      .callsFake((newState, callback) => {
        if (callback) {
          callback();
        }
      });
    newWrapper.find(HeaderBar).at(0).props().onFilterItemPressFn(0);
    await sleep(10);
    expect(newWrapper.instance()._refreshByParams).not.toBeCalled();
    NewsScreen.prototype.setState.restore();
  });

  it('Should refresh news list when input some search words and press enter button', () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    wrapper.instance()._refreshByParams = jest.fn();
    wrapper.find(SearchBar).at(0).props().onSubmitEditing('Test');
    expect(wrapper.instance()._refreshByParams).toBeCalled();
  });

  it('Should not refresh news list when input empty search words and press enter button', () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    wrapper.instance()._refreshByParams = jest.fn();
    wrapper.find(SearchBar).at(0).props().onSubmitEditing('');
    expect(wrapper.instance()._refreshByParams).not.toBeCalled();
  });

  it('Should refresh news list when call onPullFn in GridList', () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    wrapper.instance()._refreshByParams = jest.fn();
    wrapper.find(GridList).at(0).props().onPullFn('Test');
    expect(wrapper.instance()._refreshByParams).toBeCalled();
  });

  it('Should set news in state to new list when do not fetch more news', () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    expect(wrapper.instance().state.isFetchingMore).toEqual(false);
    const newsList = [{
      title: 'Title',
    }];
    wrapper.setProps({
      newsList,
    });
    wrapper.update();
    expect(wrapper.instance().state.news).toEqual(newsList);
  });

  it('Should still equal [] for news in state when next news list is null', () => {
    const wrapper = shallow(<NewsScreen {...props} />);
    expect(wrapper.instance().state.isFetchingMore).toEqual(false);
    wrapper.setProps({
      newsList: null,
    });
    wrapper.update();
    expect(wrapper.instance().state.news).toEqual([]);
  });

  it('Should call fetchNews to get more news when call _handleFetchMoreNews', () => {
    const newProsp = {
      ...props,
      newsList: [{
        title: 'old title',
      }],
    };
    const wrapper = shallow(<NewsScreen {...newProsp} />);
    expect(wrapper.instance().state.isFetchingMore).toEqual(false);
    wrapper.find(GridList).at(0).props().loadMoreFn();
    const newsList = [{
      title: 'Title',
    }];
    wrapper.setProps({
      newsList,
    });
    wrapper.update();
    expect(wrapper.instance().props.fetchNews).toBeCalled();
  });

  it('Should isFetchingMore still equal false when the news in state count equal total count', () => {
    const newProsp = {
      ...props,
      totalResults: 1,
    };
    const wrapper = shallow(<NewsScreen {...newProsp} />);
    wrapper.instance().props.fetchNews = jest.fn();
    const newWrapper = wrapper.setState({
      news: [{
        title: 'old title',
      }],
    });
    newWrapper.find(GridList).at(0).props().loadMoreFn();
    expect(wrapper.instance().state.isFetchingMore).toEqual(false);
  });

  describe('mapStateToProps and mapDispatchToProps', () => {
    const wrapper = shallow(<ConnectedNewsScreen {...props} />, { context: { store } });
    it('Should contain GET_NEWS when call fetchNews', () => {
      wrapper.props().fetchNews();
      const actions = store.getActions();
      const actionTypes = actions.map(a => a.type);
      expect(actionTypes).toContain(NewsTypes.GET_NEWS);
    });
    it('Should contain GET_AGENCY when call fetchAgency', () => {
      wrapper.props().fetchAgency();
      const actions = store.getActions();
      const actionTypes = actions.map(a => a.type);
      expect(actionTypes).toContain(NewsTypes.GET_AGENCY);
    });
  });
});
