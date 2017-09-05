import {FetchFoodMenuItems, FetchAllPurchaseRecords} from '../api/serverHelpers.js';

import * as actionTypes from '../constants/actionTypes';


/**
 * Interface for getting both the available food items to order and the open purchase record tabs, making sure both are done before setting state in App.js to reduce unnecessary re-renders
 * @returns {Promise.<*[]>}
 */
export const fetchAppState = () =>{
	return (dispatch) =>{
		dispatch({
			type: actionTypes.FETCH_ALL_REQUEST,
		});
		Promise.all([FetchFoodMenuItems(), FetchAllPurchaseRecords()]).then(([foodMenuItems, purchaseRecords]) =>{
			dispatch({
				type:    actionTypes.FETCH_ALL_SUCCESS,
				payload: {foodMenuItems, purchaseRecords}
			});
		});
	};
};