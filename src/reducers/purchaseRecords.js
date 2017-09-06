import * as actionTypes from '../constants/actionTypes';
import {addTotals} from '../utils/utils';
import find from 'lodash/find';

const purchaseRecord = (state = {}, action) =>{
	switch(action.type){
		case actionTypes.CREATE_PURCHASE_RECORD:
			if(state.id === action.payload.id){
				return {
					...state,
					status: 'new'
				};
			}
			return action.payload;
		case actionTypes.CHANGE_PURCHASE_ORDER_ITEM_QUANTITY:
			/* I don't like how procedural this is, would refactor */
			if(state.id !== action.payload.id){
				return state;
			}

			let newItems = [];
			// handle case where food item isn't in the record yet
			if(find(state.items, ['id', action.payload.item.id]) === undefined) {
				newItems = state.items.concat([action.payload.item]);
				}
			else {
				newItems = state.items.map((item) =>{
					if(item.id !== action.payload.item.id){
						return item;
					}
					else{
						return {
							...item,
							quantity: action.payload.item.quantity
						}
					}
				});
			}
			return {
				...state,
				items: newItems,
				totalCost: addTotals({items:newItems, key: 'unitCost'})
			};
		case actionTypes.CLOSE_PURCHASE_RECORD:
			if(state.id !== action.payload.id){
				return state;
			}
			else {
				return {
					...state,
					status: 'closed'
				}
			}
		case actionTypes.CANCEL_PURCHASE_RECORD:
			if(state.id !== action.payload.id){
				return state;
			}
			else {
				return {
					...state,
					status: 'cancelled'
				}
			}
		case actionTypes.SAVE_PURCHASE_RECORD:
			if(state.id !== action.payload.id){
				return state;
			}
			else {
				return {
					...state,
					status: 'open'
				}
			}
		default:
			return state;
	}
};

const purchaseRecords = (state = [], action) =>{
	switch(action.type){
		case actionTypes.FETCH_ALL_SUCCESS:
			return action.payload.purchaseRecords;
		case actionTypes.CREATE_PURCHASE_RECORD:
			return [
				...state,
				purchaseRecord(undefined, action),
			];
		case actionTypes.CHANGE_PURCHASE_ORDER_ITEM_QUANTITY:
			return state.map(record =>
				purchaseRecord(record, action)
			);
		case actionTypes.CANCEL_PURCHASE_RECORD:
			return state.map(record =>
				purchaseRecord(record, action)
			);
		case actionTypes.CLOSE_PURCHASE_RECORD:
			return state.map(record =>
				purchaseRecord(record, action)
			);
		case actionTypes.SAVE_PURCHASE_RECORD:
			return state.map(record =>
				purchaseRecord(record, action)
			);
		default:
			return state;
	}
};

export default purchaseRecords;
