import { takeLatest, all } from 'redux-saga/effects';

/* ------------- Types ------------- */
import { NewsTypes } from '../Redux/NewsRedux';

/* ------------- Sagas ------------- */

import {
  getNewsWorker,
  getAgencyWorker,
} from './NewsSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(NewsTypes.GET_NEWS, getNewsWorker),
    takeLatest(NewsTypes.GET_AGENCY, getAgencyWorker),
  ]);
}
