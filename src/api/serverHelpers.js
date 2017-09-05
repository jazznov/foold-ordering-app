import filter from 'lodash/filter';
import find from 'lodash/find';

/* Mock JSON data currently simulating GET from BE */
import * as purchaseRecords from './purchaseRecords.json';
import * as foodMenuItems from './foodMenuItems.json';

/**
 * Gets food menu items to show in purchasing interface
 * @returns {Promise}
 * @constructor
 */
export const FetchFoodMenuItems = () =>{
	return new Promise((resolve) =>{
		resolve(
			requestData({url: foodMenuItems.data})
		)
	})
};

/**
 Gets data from server
 */
const requestData = ({url}) =>{
	// TODO Use Fetch if I get dynamic server in place
	/*	return fetch('http://localhost:3000/public/purchasePurchaseRecords', {
			method:      'get',
			headers:     {
				"Content-type": 'application/json'
			}
		}).then((response) => { return response.ok ? response.text() : null });
	/**/
	return new Promise((resolve) =>{
		resolve(url);
	})
};

/*
* Finding the record among open orders by ID. Realistically we'd be better off fetching the record from a web service rather than the open orders stored in browser memory */
export const GetPurchaseRecord = ({items, id}) =>{
	return new Promise((resolve) =>{
		const purchaseRecord = find(items, (dataItem) =>{
			return dataItem.id == id;
		});
		resolve(
			{
				id:        purchaseRecord.id,
				totalCost: purchaseRecord.totalCost,
				status:        purchaseRecord.status,
				items:     purchaseRecord.items
			}
		);
	});
};

// TODO Refactor/break out filter
export const FetchAllPurchaseRecords = () =>{
	return new Promise((resolve) =>{
		const openOrders = requestData({url: purchaseRecords.data}).then((data) => filter(data, {'status': 'open'}));
		resolve(openOrders);
	});
};

