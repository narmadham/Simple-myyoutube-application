import { createSelector } from 'reselect';

const getFullData = state => state.getIn(['home', 'fullDetails']).toJS();
const selectedCategory = state => state.getIn(['home', 'selectedCategory']);
const selectedDates = state => state.getIn(['home', 'selectedDate']).toJS();

 export const getFilteredData = createSelector(
	[getFullData, selectedCategory, selectedDates],
	(fullData, id, dates) => {
		if(id) {
			const filteredData = fullData.filter(data => {
				if(data.snippet.categoryId === id) {
						return data;
				}
			});
			console.log(filteredData);
			return filteredData;
		}
		if(dates && Object.keys(dates).length) {
			const filteredData = fullData.filter(data => {
				if(dates && dates.min < new Date(data.snippet.publishedAt).getFullYear() && new Date(data.snippet.publishedAt).getFullYear() < dates.max) {
					return data;	
				}
			});
			return filteredData;
		}
		return fullData;
	}
	);


 export const getDates = createSelector(
	[getFullData],
	(fullData) => { 
		if(fullData.length > 0) {
			const dates = fullData.map( item => new Date(item.snippet.publishedAt).getFullYear());
			return dates;
		}
	}
	);
