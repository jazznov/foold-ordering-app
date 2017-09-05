import React from 'react';
import PropTypes from 'prop-types';

const QuantityController = ({id, unitCost, quantity, onQuantityChange}) => {

	return (
		<input name={id} value={quantity} onChange={(e) => onQuantityChange({id, unitCost, quantity: e.target.value})}  type='number' step='1' min='0' />
	)
};

export default QuantityController;

QuantityController.propTypes = {
	onQuantityChange: PropTypes.func.isRequired,
	value: PropTypes.number,
	quantity:PropTypes.number
};



