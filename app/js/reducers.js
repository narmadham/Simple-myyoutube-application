import { combineReducers } from 'redux-immutablejs';

// Reducers
import homeReducer from './views/Home/reducers';
import listReducer from './views/MyList/reducers';

// Combine Reducers
const reducers = combineReducers({
	home: homeReducer,
	myList: listReducer
});

export default reducers;
