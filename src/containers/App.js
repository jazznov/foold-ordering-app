import React, {Component} from 'react';
import { connect } from 'react-redux';
import Tabs from '../components/Tabs.js';
import PurchaseMenu from '../components/PurchaseMenu.js';
import {GetPurchaseRecord} from '../api/serverHelpers.js';
import '../styles/App.css';
import cloneDeep from 'lodash/cloneDeep';

class App extends Component {
	constructor(){
		super();
		this.handlePurchaseRecordTabClicked = this.handlePurchaseRecordTabClicked.bind(this);
		this.handleNewNewRecordClicked = this.handleNewNewRecordClicked.bind(this);
		this.state = {
			activePurchaseRecordId: '',
			purchaseRecords: [],
			actionMode: ''
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

		this.setState({purchaseRecord: newPurchaseRecord});
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
					purchaseRecord:         purchaseRecord,
					// storing updated purchase order tab id
					activePurchaseRecordId: itemClicked.id
				});
			});
	}

	render(){
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

						{this.state.purchaseRecord ? <PurchaseMenu purchaseRecord={this.state.purchaseRecord} foodMenuItems={this.props.foodMenuItems}/>
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
	purchaseRecords: state.purchaseRecords,
});

/*const mapDispatchToProps = {
	getCharactersFromAPI: offset => getCharactersFromAPI(offset),
};*/

export default connect(mapStateToProps)(App);
