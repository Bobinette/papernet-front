import { call, fork, put, take } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';

import { TOKEN_RECEIVE } from 'services/auth/constants';

import googleApi from '../.';
import { TOKEN_FETCH_GOOGLE } from '../constants';

function* fetchToken(code, state) {
  const { token, fromURL, error } = yield call(googleApi.fetchToken, code, state);
  if (error) {
    toastr.error('Error fetching token', `Error: ${error.json.error}`);
    return;
  }

  yield put({ type: TOKEN_RECEIVE, token });
  yield call(browserHistory.push, fromURL || '/papers');
}

export default function* watchGoogleFetchTokenSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { code, state } = yield take(TOKEN_FETCH_GOOGLE);
    yield fork(fetchToken, code, state);
  }
}
