import React, {Component} from 'react';
import { connect } from 'react-redux';
import Tabs from '../components/Tabs.js';
import PurchaseMenu from '../components/PurchaseMenu.js';
import {GetPurchaseRecord} from '../api/serverHelpers.js';
import {alertOnOpenRecordsAmount, getOpenRecords} from '../utils/utils';
import '../styles/App.css';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import {handleCreatePurchaseRecord} from '../actions/actions';

class App extends Component {
	constructor(){
		super();
		this.handlePurchaseRecordTabClicked = this.handlePurchaseRecordTabClicked.bind(this);
		this.handleNewNewRecordClicked = this.handleNewNewRecordClicked.bind(this);
		this.state = {
			activePurchaseRecordId: ''
		}
	}

	// TODO Move this into an action creator
	handleNewNewRecordClicked() {
		const newPurchaseRecord = {
			items: cloneDeep(this.props.foodMenuItems),
			id: Date.now(),
			totalCost: 0,
			status: 'new'
		};
		this.props.handleCreatePurchaseRecord(newPurchaseRecord);

		// TODO Move out of local state
		this.setState({
			activePurchaseRecordId: newPurchaseRecord.id
		});
	}

	/**
	 * Get the data based on the purchase order tab that was clicked
	 * @param itemClicked
	 */
	handlePurchaseRecordTabClicked(itemClicked){
		GetPurchaseRecord({
			items: this.props.purchaseRecords,
			id:    itemClicked.id
		})
			.then((purchaseRecord) =>{
				this.setState({
					// storing updated purchase order tab id
					activePurchaseRecordId: itemClicked.id
				});
			});
	}
	componentDidUpdate() {
		// Figured this would be an easy way/good time to show the alert without blocking any other running JS.
		alertOnOpenRecordsAmount({records: getOpenRecords(this.props.purchaseRecords), amount: 4});
	}

	render(){
		const activePurchaseRecord = find(this.props.purchaseRecords, ['id', this.state.activePurchaseRecordId]);
		return (
			<div>
				<main className="main-content">
					<div className="page-heading">
						<h1>Food Order System</h1>
						<button type='button' onClick={this.handleNewNewRecordClicked}>New Order</button>
					</div>

					<div className="two-col">
						<div className="purchase-record-tabs">
							<h2 className="as-h4">Open Orders</h2>
							{this.props.purchaseRecords.length ?
								<Tabs
									tabWrapperClassName="tabs-vertical"
									tabItemClassName="tab-item" itemTitleKey="id" itemSubTitleKey="totalCost" activeItemId={this.state.activePurchaseRecordId} identifier="id" tabItems={this.props.purchaseRecords} handleItemClick={this.handlePurchaseRecordTabClicked}> </Tabs>
								:
								null
							}
						</div>

						{this.state.activePurchaseRecordId ? <PurchaseMenu purchaseRecord={activePurchaseRecord} foodMenuItems={this.props.foodMenuItems}/>
							: <div>
								Click an open order to view or click new Order
							</div>}
					</div>
				</main>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	foodMenuItems: state.foodMenuItems,
	purchaseRecords: state.purchaseRecords
});

const mapDispatchToProps = (dispatch) =>{
	return {
		handleCreatePurchaseRecord: (purchaseRecord) =>{
			dispatch(handleCreatePurchaseRecord(purchaseRecord));
		}
	}
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
