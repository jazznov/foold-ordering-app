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

export const handleQuantityChange = (options = console.error("No data passed to handleQuantityChange")) =>{
	console.log("item is:" + options);

	return {
		type:    actionTypes.CHANGE_PURCHASE_ORDER_ITEM_QUANTITY,
		payload: {
			id:   options.id,
			item: {
				id:           options.item.id,
				unitCost:     options.item.unitCost,
				quantity: options.item.quantity
			}
		}
	};
};

export const handleSavePurchaseRecord = (id = console.error("No data passed to handleCreatePurchaseRecord")) =>{
	return {
		type:    actionTypes.SAVE_PURCHASE_RECORD,
		payload: {
			id: id
		}
	};
};

/*
* Not very intuitive but this is meant to set a new, empty record with status NEW (not yet an OPEN order )*/
export const handleCreatePurchaseRecord = (payload = console.error("No data passed to handleCreatePurchaseRecord")) =>{
	//payload.items.reduce((item))
	return {
		type:    actionTypes.CREATE_PURCHASE_RECORD,
		payload: {
			...payload
		}
	};
};

export const handleCancelRecord = (id = console.error("No id passed to handleCancelRecord")) =>{
	//payload.items.reduce((item))
	return {
		type:    actionTypes.CANCEL_PURCHASE_RECORD,
		payload: {
			id
		}
	};
};

export const handleCloseRecord = (id = console.error("No id passed to handleCloseRecord")) =>{
	//payload.items.reduce((item))
	return {
		type:    actionTypes.CLOSE_PURCHASE_RECORD,
		payload: {
			id
		}
	};
};
