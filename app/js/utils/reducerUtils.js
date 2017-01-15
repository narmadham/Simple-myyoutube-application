import Immutable from 'immutable';

/**
 * Initial state creator for reducers.
 */
export const getInitialState = (initial) => Immutable.fromJS(Object.assign({
	data: {}
}, initial));
