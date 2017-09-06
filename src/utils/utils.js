import isNumber from 'lodash/isNumber';
import find from 'lodash/find';
import filter from 'lodash/filter';

export const formatToDollars = (value = console.error('Value undefined passed to formatToDollars')) =>{

	const format = value => value.toLocaleString('en-US', {
		style:    'currency',
		currency: 'USD',
	});

	switch(isNumber(value)){
		case true:
			return format(value);
		case false:
			return format(parseInt(value, 10));
	}
};

export const matchMenuItemsToPurchaseItems = ({foodMenuItem, purchaseRecordItems}) =>{
	return find(purchaseRecordItems, (recordItem) =>{
		return recordItem.id === foodMenuItem.id
	});
};

export const getOpenRecords = (records) =>{
	return filter(records, {'status': 'open'})
};

export const alertOnOpenRecordsAmount = ({records, amount}) =>{
	if(records.length === amount){
		alert('4 orders are now open');
	}
};

/*
* Thank you: https://stackoverflow.com/questions/39828497/sum-of-string-values-on-array-object#answer-39828726
* */
export const addTotals = ({items, key, multiplier}) =>{
	return items.reduce(function(total, item){
		if(isNaN(item[key]) || isNaN(item[multiplier])){
			return total;
		}
		else {
			return total + (parseFloat(item[key]) * parseFloat(item[multiplier]));
		}
	}, 0);
};
