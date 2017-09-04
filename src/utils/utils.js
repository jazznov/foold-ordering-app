import isNumber from 'lodash/isNumber';

export const formatToDollars = (number) => {
	return number.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};