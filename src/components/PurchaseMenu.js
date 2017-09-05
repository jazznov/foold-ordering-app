import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatToDollars, matchMenuItemsToPurchaseItems} from '../utils/utils';
import QuantityController from './QuantityController';
import {handleQuantityChange,handleSavePurchaseRecord,handleCancelRecord,handleCloseRecord} from '../actions/actions';

class PurchaseMenu extends Component {
	// TODO Handle Read Only View?
	showFoodMenuItems(){
		const purchaseRecords = this.props.purchaseRecord;
		const menuItems = this.props.foodMenuItems && this.props.foodMenuItems.map((item, index) =>{

			const matchedPurchasedItem = matchMenuItemsToPurchaseItems({
				foodMenuItem:        item,
				purchaseRecordItems: purchaseRecords.items
			});
			let quantity = (matchedPurchasedItem && matchedPurchasedItem.quantity) ? matchedPurchasedItem.quantity : 0;
			return (
				<li key={index}>
					<ul className='list-unstyled list-inline'>
						<li><h5>{item.title}</h5></li>
						{this.props.purchaseRecord.status === 'new' || this.props.purchaseRecord.status === 'open' ?
							<li>
								<QuantityController onQuantityChange={this.props.onQuantityChange} {...item} quantity={quantity} parentRecordId={this.props.purchaseRecord.id}/>
							</li>
							: null}
						<li>Unit Cost: {formatToDollars(item.unitCost)}</li>
					</ul>
				</li>
			);
		});

		return (menuItems);
	}

	render(){
		const totalConst = formatToDollars(this.props.purchaseRecord.totalCost);
		return (
			<section className="purchase-record-content">
				<form>
					<h4>Purchase Record ID: {this.props.purchaseRecord.id}</h4>
					<p>Status: {this.props.purchaseRecord.status.toUpperCase()}</p>
					<p>Total Cost: {totalConst}</p>
					<ul className='list-unstyled'>
						{this.showFoodMenuItems()}
					</ul>

					{this.props.purchaseRecord.status === 'new' ?
						<button onClick={this.props.onCreatePurchaseOrder} type='button'>Create Order</button>
						: null}

					{this.props.purchaseRecord.status === 'open' ?
						<div>
							<button onClick={this.props.onSavePurchaseOrder} type='button'>Save Order</button>
							<button onClick={this.props.onCancelOrderClicked} type='button'>Cancel Order</button>
							<button onClick={this.props.onCloseOrderClicked} type='button'>Close Order</button>
						</div>
						: null}
				</form>
			</section>
		);
	}
};

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) =>{
	const purchaseRecordId = ownProps.purchaseRecord.id;
	return {
		onQuantityChange:      ({id, unitCost, quantity}) =>{
			dispatch(handleQuantityChange({
					id:   purchaseRecordId,
					item: {
						id: id,
						quantity,
						unitCost
					}
				})
			)
		},
		onCreatePurchaseOrder: () =>{
			dispatch(handleSavePurchaseRecord(purchaseRecordId));
		},
		onSavePurchaseOrder:   () =>{
			dispatch(handleSavePurchaseRecord(purchaseRecordId));
		},
		onCancelOrderClicked:  () =>{
			dispatch(handleCancelRecord(purchaseRecordId));
		},
		onCloseOrderClicked:   () =>{
			dispatch(handleCloseRecord(purchaseRecordId));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseMenu);