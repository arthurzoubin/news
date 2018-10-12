import { call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import { getNewsWorker, getAgencyWorker } from '../NewsSagas';
import NewsActions from '../../Redux/NewsRedux';
import { getNewsAPI, getSearchNewsAPI, getAgencyAPI } from '../../Services/News';

describe('News saga', () => {
  let action;
  describe('News List', () => {
    const payload = {
      country: 'us',
      page: 1,
      pageSize: 10,
    };
    beforeEach(() => {
      action = getNewsWorker(NewsActions.getNews(payload));
    });

    it('call api', () => {
      const actionVal = action.next().value;
      expect(actionVal).toEqual(call(getNewsAPI, payload));
    });

    it('call api with q in payload', () => {
      const newPayload = {
        ...payload,
        q: '1',
      };
      const actionNew = getNewsWorker(NewsActions.getNews(newPayload));
      const actionVal = actionNew.next().value;
      expect(actionVal).toEqual(call(getSearchNewsAPI, newPayload));
    });

    describe('Response', () => {
      beforeEach(() => {
        action = getNewsWorker(NewsActions.getNews(payload));
        action.next().value;
      });

      test('response when success', () => {
        const dummy = {
          data: {
            status: 'ok',
          },
        };
        const actionVal = action.next(dummy).value;
        const expectDummy = path(['data'], dummy);
        expect(actionVal).toEqual(put(NewsActions.getNewsSuccess(expectDummy)));
      });

      test('response when failure', () => {
        const dummy = {
          data: {
            message: 'Have a error',
          },
        };
        const actionVal = action.next(dummy).value;
        const expectDummy = path(['data'], dummy);
        expect(actionVal).toEqual(put(NewsActions.getNewsFailure(expectDummy)));
      });
    });
  });

  describe('News List', () => {
    const payloadAgency = {
      country: 'us',
    };
    beforeEach(() => {
      action = getAgencyWorker(NewsActions.getAgency(payloadAgency));
    });

    it('call api', () => {
      const actionVal = action.next().value;
      expect(actionVal).toEqual(call(getAgencyAPI, payloadAgency));
    });

    describe('Response', () => {
      beforeEach(() => {
        action = getAgencyWorker(NewsActions.getNews(payloadAgency));
        action.next().value;
      });

      test('response when success', () => {
        const dummy = {
          data: {
            status: 'ok',
          },
        };
        const actionVal = action.next(dummy).value;
        const expectDummy = path(['data'], dummy);
        expect(actionVal).toEqual(put(NewsActions.getAgencySuccess(expectDummy)));
      });

      test('response when failure', () => {
        const dummy = {
          data: {
            message: 'Have a error',
          },
        };
        const actionVal = action.next(dummy).value;
        const expectDummy = path(['data'], dummy);
        expect(actionVal).toEqual(put(NewsActions.getAgencyFailure(expectDummy)));
      });
    });
  });
});
