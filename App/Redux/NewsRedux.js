import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNews: ['payload'],
  getNewsSuccess: ['response'],
  getNewsFailure: ['error'],
  getAgency: ['payloadAgency'],
  getAgencySuccess: ['response'],
  getAgencyFailure: ['error'],
});

export const NewsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
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

/* ------------- Reducers ------------- */

// request the avatar for a user
export const getNewsRequest = (state, { payload }) => {
  return state.merge({ fetching: true, payload });
};

// successful avatar lookup
export const getNewsSuccess = (state, action) => {
  const {
    response: {
      articles,
      totalResults,
    },
  } = action;
  return state.merge({
    fetching: false,
    error: null,
    newsList: articles,
    totalResults,
  });
};

// failed to get the avatar
export const getNewsFailure = (state, action) => {
  const { error } = action;
  return state.merge({ fetching: false, error });
};

export const getAgencyRequest = (state, { payload }) => {
  return state.merge({ fetchingAgency: true, payloadAgency: payload });
};

export const getAgencySuccess = (state, action) => {
  const {
    response: {
      sources,
    },
  } = action;
  return state.merge({
    fetchingAgency: false,
    errorAgency: null,
    agency: sources,
  });
};

export const getAgencyFailure = (state, action) => {
  const { error } = action;
  return state.merge({ fetchingAgency: false, errorAgency: error });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NEWS]: getNewsRequest,
  [Types.GET_NEWS_SUCCESS]: getNewsSuccess,
  [Types.GET_NEWS_FAILURE]: getNewsFailure,
  [Types.GET_AGENCY]: getAgencyRequest,
  [Types.GET_AGENCY_SUCCESS]: getAgencySuccess,
  [Types.GET_AGENCY_FAILURE]: getAgencyFailure,
});
