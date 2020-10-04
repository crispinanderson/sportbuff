import { all } from 'redux-saga/effects';
import { watchGetQuestionsRequest } from './questions/questions.saga';

export default function* rootSaga() {
  yield all([
    watchGetQuestionsRequest()
  ]);
}
