import React from 'react';
import PropTypes from 'prop-types';

const QuantityController = (props) => {
	return (
		<input name={props.id}  value={props.itemQuantity}  type='range' step='1' min='0' />
	)
};

export default QuantityController;

QuantityController.propTypes = {
	handleQuantityChange: PropTypes.func,
	value: PropTypes.number
};



