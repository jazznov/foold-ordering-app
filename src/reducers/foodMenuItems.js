import * as actionTypes from '../constants/actionTypes';

const foodMenuItems = (state = [], action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL_SUCCESS:
				return action.payload.foodMenuItems;
		default:
			return state;
	}
};

export default foodMenuItems;