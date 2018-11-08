import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import articles from './articles';
import ui from './reducers/ui';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({
  articles,
  ui,
});

export default createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);
