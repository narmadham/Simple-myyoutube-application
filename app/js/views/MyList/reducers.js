import { ACTIONS } from './actions';
import Immutable from 'immutable';

import { getInitialState } from './../../utils/reducerUtils';

export const initialState = {
  myVideos: {}
};

const listReducer = (state = getInitialState(initialState), action) => {
	switch (action.type) {
		case ACTIONS.GET_FULL_DETAILS_MYLIST:
			return state.merge({
				myVideos: action.items
			})
		default:
		return state;
	}
  };

export default listReducer;
