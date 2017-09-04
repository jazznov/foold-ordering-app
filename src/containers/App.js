import React, {Component} from 'react';
import Tabs from '../components/Tabs.js';
import PurchaseRecord from '../components/PurchaseRecord.js';
import {getPageData, GetPurchaseRecord} from '../api/serverHelpers.js';
import '../styles/App.css';

export default class App extends Component {
	constructor(){
		super();
		this.handlePurchaseRecordTabClicked = this.handlePurchaseRecordTabClicked.bind(this);
		this.state = {
			purchaseRecord:  '',
			purchaseRecords: []
		}
	}

	componentDidMount(){
		getPageData()
			.then(([foodMenuItems, purchaseRecords]) =>{
				this.setState({
					foodMenuItems,
					purchaseRecords,
				});
			});
	}

	/**
	 * Get the data based on the purchase order tab that was clicked Tabs.jsSe
	 * @param itemClicked
	 */
	handlePurchaseRecordTabClicked(itemClicked){
		GetPurchaseRecord({
			items: this.state.purchaseRecords,
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
					</div>

					<div className="two-col">
						<h2 className="as-h4">Open Orders</h2>
						<div className="purchase-order-tabs">
							{this.state.purchaseRecords.length ?
								<Tabs tabWrapperClassName="tabs-vertical" tabItemClassName="tab-item" itemTitleKey="id" itemSubTitleKey="totalCost" activeItemId={this.state.activePurchaseRecordId} identifier="id" tabItems={this.state.purchaseRecords} handleItemClick={this.handlePurchaseRecordTabClicked}> </Tabs>
								:
								null
							}
						</div>

						{this.state.purchaseRecord ?
							<PurchaseRecord purchaseRecord={this.state.purchaseRecord}/>
							:
							<p>Loading</p>
						}
					</div>
				</main>
			</div>
		);
	}
}
