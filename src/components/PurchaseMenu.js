import React, {Component} from 'react';
import {formatToDollars, matchMenuItemsToPurchaseItems} from '../utils/utils';
import QuantityController from './QuantityController';

const onSubmit = function(event){
	event.preventDefault();
	console.log(event);
};

export default class OrderMenu extends Component {
	// TODO Handle Read Only View?
	showFoodMenuItems(){
		const purchaseRecords = this.props.purchaseRecord;
		const elements = this.props.foodMenuItems && this.props.foodMenuItems.map((item, index) =>{

			const matchedPurchasedItem = matchMenuItemsToPurchaseItems({
				foodMenuItem:        item,
				purchaseRecordItems: purchaseRecords.items
			});
			let itemQuantity = (matchedPurchasedItem && matchedPurchasedItem.quantity) ? matchedPurchasedItem.quantity : 0;
			return (
				<li key={index}>
					<h5>{item.title}</h5>
					<ul>
						<li>Quantity: {itemQuantity}</li>
						{this.props.purchaseRecord.status === 'new' || this.props.purchaseRecord.status === 'open' ?
							<QuantityController quantity={itemQuantity} id={item.id}/>
							: null}

						<li>Unit Cost: {formatToDollars(item.unitCost)}</li>
					</ul>
				</li>
			);
		});

		return (elements);
	}

	render(){
		const totalConst = formatToDollars(this.props.purchaseRecord.totalCost);
		return (
			<section className="purchase-record-content">
				<form onSubmit={onSubmit}>
					<h4>Purchase Record ID: {this.props.purchaseRecord.id}</h4>
					<p>Total Cost: {totalConst}</p>
					<ul>
						{this.showFoodMenuItems()}
					</ul>

					{this.props.purchaseRecord.status === 'new' ?
						<button type='submit'>Create Order</button>
						: null}

					{this.props.purchaseRecord.status === 'open' ?
						<div>
							<button type='button'>Cancel Order</button>
							<button type='submit'>Close Order</button>
						</div>
						: null}
				</form>
			</section>
		);
	}
};