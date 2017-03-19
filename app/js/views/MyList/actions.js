import fetch from 'isomorphic-fetch'
import checkStatus from './../../utils/checkStatus';
import parseJSON from './../../utils/parseJSON';

export const ACTIONS = {
	GET_FULL_DETAILS_MYLIST: 'GET_FULL_DETAILS_MYLIST_ACTION'
};

export function loadMyVideos() {
	if(localStorage.getItem('videos')) {
		var apiKey ='AIzaSyCTxKpIGbIt7CIizPNGCiG2DVZdx6PMuEQ';
			return function(dispatch) {
			return fetchFullDetails(localStorage.getItem('videos'), apiKey)
				.then(result => dispatch(getDetailsSuccess(result, localStorage.getItem('videos'), apiKey)))
				.catch(error => dispatch(getFailure(error)));
			}
	}
}
//Duplicate of function in Home page. To be moved to common file
function fetchFullDetails(idString, apiKey) {
	return fetch('https://www.googleapis.com/youtube/v3/videos?id='+idString+'&key='+apiKey+'&part=snippet,statistics&fields=items(id,snippet,statistics)')
		.then(checkStatus)
		.then(parseJSON)
}

export function getDetailsSuccess(results, idString, apiKey) {
	console.log(results.items);
	const items = results.items;
	return {
		type: ACTIONS.GET_FULL_DETAILS_MYLIST,
		items
	};
}

export function getFailure(error) {
	console.log(error);
}


