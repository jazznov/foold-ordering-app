import {addTotals} from './utils';

it('sums an array of values with multipliers', () => {
	const items = [
		{
			"id": 1,
			"unitCost": 4.50,
			"quantity": 1
		},
		{
			"id": 2,
			"unitCost": "1",
			"quantity": "11"
		},
		{
			"id": 2,
			"unitCost": "3",
			"quantity": 2
		},
		{
			"id": 3,
			"unitCost": "3"
		}
	];

	expect(addTotals({items:items, key: 'unitCost', multiplier: 'quantity'})).toEqual(21.5);
});