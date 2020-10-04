
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { questionReduxReducer } from './reducers/quiz/quiz.reducer';
import { warningReduxReducer } from './reducers/warning/warning.reducer';


const overallReducer = combineReducers({
  quiz: questionReduxReducer,
  warning: warningReduxReducer
});

// Sage Middleware is used for fetching external resources.
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  overallReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export { store };
