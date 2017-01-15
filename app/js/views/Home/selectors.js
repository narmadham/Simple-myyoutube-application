import { createSelector } from 'reselect';

const getFullData = state => state.getIn(['home', 'fullDetails']).toJS();
const selectedCategory = state => state.getIn(['home', 'selectedCategory']);

 export const getFilteredData = createSelector(
	[getFullData, selectedCategory],
	(fullData, id) => {

		if(id) {
			const filteredData = fullData.filter(data => {
				if(data.snippet.categoryId === id) {
					return data;
				}
			});
			console.log(filteredData);
			return filteredData;
		}
		return fullData;
	}
	);
