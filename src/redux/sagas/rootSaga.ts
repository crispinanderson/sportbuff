import { all } from 'redux-saga/effects';
import { watchGetQuestionsRequest } from './questions/questions.saga.ts';

export default function* rootSaga() {
  yield all([
    watchGetQuestionsRequest()
  ]);
}
