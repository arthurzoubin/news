import React from 'react';
import configureStore from 'redux-mock-store';
import Immutable from 'seamless-immutable';
import { shallow } from 'enzyme';
import PrimaryNav from '../AppNavigation';

jest.mock('react-navigation', () => {
  return {
    StackNavigator: jest.fn().mockImplementation(routeConfigMap => routeConfigMap),
  };
});

const mockStore = configureStore([]);

describe('AppNavigation', () => {
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
  it('PrimaryNav', () => {
    const wrapper = shallow(<PrimaryNav.NewsScreen.screen />, { context: { store } });
    expect(wrapper.instance().store).toEqual(store);
  });
});
