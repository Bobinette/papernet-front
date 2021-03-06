import { fork } from 'redux-saga/effects';

// Services
import authSagas from 'services/auth/sagas';

// Scenes
import cronsSagas from 'scenes/crons/api/sagas';
import editPaperSagas from 'scenes/edit-paper/api/sagas';
import homeSagas from 'scenes/home/api/sagas';
import importsSagas from 'scenes/imports/api/sagas';
import loginSagas from 'scenes/login/api/sagas';
import searchSagas from 'scenes/search/api/sagas';

// Old school
import profileSagas from 'profile/teams/sagas';

export default function* rootSaga() {
  yield [
    // Services
    fork(authSagas),

    // Scenes
    fork(cronsSagas),
    fork(editPaperSagas),
    fork(homeSagas),
    fork(importsSagas),
    fork(loginSagas),
    fork(searchSagas),

    // Old school
    fork(profileSagas),
  ];
}
