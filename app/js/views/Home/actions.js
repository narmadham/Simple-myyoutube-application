import fetch from 'isomorphic-fetch';
import checkStatus from './../../utils/checkStatus';
import parseJSON from './../../utils/parseJSON';

export const ACTIONS = {
    SET_DEFAULTS: 'SET_DEFAULTS_ACTION',
    SET_DATA: 'SET_DATA_ACTION',
    GET_FULL_DETAILS: 'GET_FULL_DETAILS_ACTION',
    SAVE_DATA: 'SAVE_DATA_ACTION',
    SET_CATEGORIES: 'SET_CATEGORIES_ACTION',
    FILTER_BY_CATEGORY: 'FILTER_BY_CATEGORY_ACTION',
    CHANGE_CATEGORY: 'CHANGE_CATEGORY_ACTION',
    FILTER_BY_DATE: 'FILTER_BY_DATE_ACTION',
    FETCHING: 'FETCHING'
};

export function setDefaults() {
    return {
        type: ACTIONS.SET_DEFAULTS
    };
}

export function setData(results) {
    console.log(results);
    return {
        type: ACTIONS.SET_DATA,
        results
    };
}

export function fetching() {
    return {
        type: ACTIONS.FETCHING
    };
}

// Add to list
export function saveList(id, data) {
    if (localStorage.getItem('videos')) {
        const storedVideos = localStorage.getItem('videos');
        let existingValue = '';
        if (storedVideos && storedVideos.indexOf(id) == -1) {
            existingValue = storedVideos + ',' + id;
            localStorage.setItem('videos', existingValue);
        }
    } else {
        localStorage.setItem('videos', id);
    }
    return {
        type: ACTIONS.SAVE_DATA,
        data
    };
}

// Fetch full details
export function getFullDetails(results) {
    var idString = '';
    var apiKey = 'AIzaSyCTxKpIGbIt7CIizPNGCiG2DVZdx6PMuEQ';
    for (var key in results) {
        var item = results[key];
        idString = idString + item.id.videoId + ',';
    }
    return function(dispatch) {
        dispatch(fetching());
        return fetchFullDetails(idString, apiKey)
            .then(result =>
                dispatch(getDetailsSuccess(result, idString, apiKey)))
            .catch(error => dispatch(getFailure(error)));
    };
}

function fetchFullDetails(idString, apiKey) {
    return fetch(
        'https://www.googleapis.com/youtube/v3/videos?id=' +
            idString +
            '&key=' +
            apiKey +
            '&part=snippet,statistics&fields=items(id,snippet,statistics)'
    )
        .then(checkStatus)
        .then(parseJSON);
}

function getDetailsSuccess(results, idString, apiKey) {
    console.log(results.items);
    const items = results.items;
    const categoryIds = items.map(item => {
        return item.snippet.categoryId;
    });
    return function(dispatch) {
        dispatch(getCategories(results, categoryIds, apiKey)).then(
            dispatch(setDetails(items))
        );
    };
}

export function setDetails(items) {
    return {
        type: ACTIONS.GET_FULL_DETAILS,
        items
    };
}

function getFailure(error) {
    console.log(error);
}

function getCategories(result, categoryIds, apiKey) {
    return function(dispatch) {
        return fetch(
            'https://www.googleapis.com/youtube/v3/videoCategories?id=' +
                categoryIds +
                '&key=' +
                apiKey +
                '&part=snippet'
        )
            .then(checkStatus)
            .then(parseJSON)
            .then(result => dispatch(getCategoriesSuccess(result)))
            .catch(error => dispatch(getFailure(error)));
    };
}

function getCategoriesSuccess(result) {
    let categories = [];
    categories = result.items.map(item => {
        return {
            id: item.id,
            title: item.snippet.title
        };
    });
    return {
        type: ACTIONS.SET_CATEGORIES,
        categories
    };
}

export function filterByCategory(id) {
    return {
        type: ACTIONS.CHANGE_CATEGORY,
        id
    };
}

export function filterByDate(dates) {
    return {
        type: ACTIONS.FILTER_BY_DATE,
        dates
    };
}
