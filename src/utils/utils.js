import isNumber from 'lodash/isNumber';

export const formatToDollars = (value = console.error('Value undefined passed to formatToDollars')) =>{

	const format = value => value.toLocaleString('en-US', {
		style:    'currency',
		currency: 'USD',
	});

	switch(isNumber(value)){
		case true:
			return format(value);
			break;
		case false:
			return format(parseInt(value));
	}
};