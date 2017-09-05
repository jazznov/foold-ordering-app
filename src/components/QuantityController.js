import React from 'react';
import PropTypes from 'prop-types';

const QuantityController = ({id, unitCost, quantity, onQuantityChange}) => {

	return (
		<input id={id} name={id} value={quantity} onChange={(e) => onQuantityChange({id, unitCost, quantity: e.target.value})}  type='number' step='1' min='0' className='form-control' aria-describedby={`input-${id}-describedby`}/>
	)
};

export default QuantityController;

QuantityController.propTypes = {
	onQuantityChange: PropTypes.func.isRequired,
	value: PropTypes.number,
	quantity:PropTypes.number
};



