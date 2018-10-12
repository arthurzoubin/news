import Immutable from 'seamless-immutable';
import {
  NewsTypes,
  getNewsRequest,
  getNewsSuccess,
  getNewsFailure,
  getAgencyRequest,
  getAgencySuccess,
  getAgencyFailure,
} from '../NewsRedux';

const INITIAL_STATE = Immutable({
  fetching: true,
  error: null,
  newsList: [],
  payload: null,
  totalResults: 0,
  payloadAgency: null,
  fetchingAgency: true,
  errorAgency: null,
  agency: [],
});

describe('News Redux', () => {
  it('GET_NEWS', () => {
    const payload = {
      country: 'us',
      page: 1,
      pageSize: 10,
    };
    const reducerState = getNewsRequest(INITIAL_STATE, {
      type: NewsTypes.GET_NEWS,
      payload,
    });
    const resultState = INITIAL_STATE.merge({ fetching: true, payload });
    expect(Immutable.asMutable(reducerState)).toEqual(Immutable.asMutable(resultState));
  });

  it('GET_NEWS_SUCCESS', () => {
    const response = {
      articles: [{
        title: 'Test',
      }],
      totalResults: 1,
    };
    const reducerState = getNewsSuccess(INITIAL_STATE, {
      type: NewsTypes.GET_NEWS_SUCCESS,
      response,
    });
    const resultState = INITIAL_STATE.merge({
      fetching: false,
      error: null,
      newsList: response.articles,
      totalResults: response.totalResults,
    });
    expect(Immutable.asMutable(reducerState)).toEqual(Immutable.asMutable(resultState));
  });

  it('GET_NEWS_FAILURE', () => {
    const error = {
      message: 'error',
    };
    const reducerState = getNewsFailure(INITIAL_STATE, {
      type: NewsTypes.GET_NEWS_FAILURE,
      error,
    });
    const resultState = INITIAL_STATE.merge({ fetching: false, error });
    expect(Immutable.asMutable(reducerState)).toEqual(Immutable.asMutable(resultState));
  });

  it('GET_AGENCY', () => {
    const payloadAgency = {
      country: 'us',
    };
    const reducerState = getAgencyRequest(INITIAL_STATE, {
      type: NewsTypes.GET_NEWS,
      payload: payloadAgency,
    });
    const resultState = INITIAL_STATE.merge({ fetchingAgency: true, payloadAgency });
    expect(Immutable.asMutable(reducerState)).toEqual(Immutable.asMutable(resultState));
  });

  it('GET_AGENCY_SUCCESS', () => {
    const response = {
      sources: [{
        name: 'Test',
      }],
    };
    const reducerState = getAgencySuccess(INITIAL_STATE, {
      type: NewsTypes.GET_AGENCY_SUCCESS,
      response,
    });
    const resultState = INITIAL_STATE.merge({
      fetchingAgency: false,
      errorAgency: null,
      agency: response.sources,
    });
    expect(Immutable.asMutable(reducerState)).toEqual(Immutable.asMutable(resultState));
  });

  it('GET_AGENCY_FAILURE', () => {
    const error = {
      message: 'error',
    };
    const reducerState = getAgencyFailure(INITIAL_STATE, {
      type: NewsTypes.GET_AGENCY_FAILURE,
      error,
    });
    const resultState = INITIAL_STATE.merge({ fetchingAgency: false, errorAgency: error });
    expect(Immutable.asMutable(reducerState)).toEqual(Immutable.asMutable(resultState));
  });
});
