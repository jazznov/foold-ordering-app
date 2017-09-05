import { combineReducers } from 'redux';
import purchaseRecords from './purchaseRecords';
import foodMenuItems from './foodMenuItems';


const appStore = combineReducers({
	purchaseRecords,
	foodMenuItems
});

export default appStore;
