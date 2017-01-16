import { ACTIONS } from './actions';
import Immutable from 'immutable';

import { getInitialState } from './../../utils/reducerUtils';

export const initialState = {
  data: {},
  fullDetails: {},
  savedData: {},
  categories: [],
  selectedCategory: null,
  selectedDate: {}
};

const homeReducer = (state = getInitialState(initialState), action) => {
	switch (action.type) {
		case ACTIONS.SET_DEFAULTS:
			return state.merge({
				fullDetails: {},
				selectedCategory: null,
				categories: []
			});
		case ACTIONS.SET_DATA:
			return state.merge({
				data: action.results
			});
		case ACTIONS.GET_FULL_DETAILS:
			return state.merge({
				fullDetails: action.items,
				selectedCategory: null,
				selectedDate: {}
			})
		case ACTIONS.SAVE_DATA:
			return state.merge({
				savedData: action.data
			})
		case ACTIONS.SET_CATEGORIES:
			return state.merge({
				categories: action.categories
			})
		case ACTIONS.FILTER_BY_CATEGORY:
			console.log(action.filteredData);
			return state.merge({
				filteredData: action.filteredData
			})
		case ACTIONS.CHANGE_CATEGORY:
			return state.merge({
				selectedCategory: action.id
			})
		case ACTIONS.FILTER_BY_DATE:
			return state.merge({
				selectedDate: action.dates,
				selectedCategory: null

			})
		default:
		return state;
	}
  };

export default homeReducer;
