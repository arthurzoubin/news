import { call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import NewsActions from '../Redux/NewsRedux';
import { getNewsAPI, getSearchNewsAPI, getAgencyAPI } from '../Services/News';
import responseSuccessCodes from '../Common/Constants/ResponseConstants';

export function* getNewsWorker(action) {
  const { payload } = action;
  // make the call to the api
  let response = {};
  if (payload.q) {
    response = yield call(getSearchNewsAPI, payload);
  } else {
    response = yield call(getNewsAPI, payload);
  }
  const result = path(['data'], response);
  if (result && responseSuccessCodes.indexOf(result.status) > -1) {
    // do data conversion here if needed
    yield put(NewsActions.getNewsSuccess(result));
  } else {
    yield put(NewsActions.getNewsFailure({
      message: result.message,
    }));
  }
}

export function* getAgencyWorker(action) {
  const { payloadAgency } = action;
  // make the call to the api
  const response = yield call(getAgencyAPI, payloadAgency);
  const result = path(['data'], response);
  if (result && responseSuccessCodes.indexOf(result.status) > -1) {
    // do data conversion here if needed
    yield put(NewsActions.getAgencySuccess(result));
  } else {
    yield put(NewsActions.getAgencyFailure({
      message: result.message,
    }));
  }
}
