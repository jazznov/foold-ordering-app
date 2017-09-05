import * as actionTypes from '../constants/actionTypes';

const purchaseRecords = (state = [], action) =>{
	switch(action.type){
		case actionTypes.FETCH_ALL_SUCCESS:
			return action.payload.purchaseRecords;
		default:
			return state;
	}
};

export default purchaseRecords;
