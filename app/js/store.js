import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import Immutable from 'immutable';

let enhancer;

const initialState = Immutable.fromJS({});

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
	if (window.devToolsExtension) {
		enhancer = compose(
			applyMiddleware(...middlewares),
			window.devToolsExtension()
		);
	} else {
		enhancer = applyMiddleware(...middlewares);
	}
} else { // Production environment
	enhancer = applyMiddleware(...middlewares);
}

const store = createStore(reducers, initialState, enhancer);

export default store;
