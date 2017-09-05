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
			let quantity = (matchedPurchasedItem && matchedPurchasedItem.quantity) ? Number(matchedPurchasedItem.quantity) : 0;
			return (
				<li key={index}>
					<div className='form-group spread-h-center-v'>
						<label htmlFor={item.id} className='control-label'>{item.title}</label>
						{this.props.purchaseRecord.status === 'new' || this.props.purchaseRecord.status === 'open' ?
						<QuantityController onQuantityChange={this.props.onQuantityChange} {...item} quantity={quantity} parentRecordId={this.props.purchaseRecord.id}/>
							: null}
						<p className='control-label' id={`input-${item.id}-describedby`}>Unit Cost: {formatToDollars(item.unitCost)}</p>
					</div>
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
					<h2 className='as-h3'>Purchase Record ID: {this.props.purchaseRecord.id}</h2>
					<p>Status: {this.props.purchaseRecord.status.toUpperCase()}</p>
					<p>Total Cost: {totalConst}</p>
					<ul className='list-unstyled'>
						{this.showFoodMenuItems()}
					</ul>

					{this.props.purchaseRecord.status === 'new' ?
						<div className='btn-group spread-h-center-v'>
							<button className='btn btn-primary' onClick={this.props.onCreatePurchaseOrder} type='button'>Create Order</button>
						</div>
							: null}

					{this.props.purchaseRecord.status === 'open' ?
						<div className='btn-group spread-h-center-v'>
							<button className='btn btn-primary' onClick={this.props.onSavePurchaseOrder} type='button'>Save Order</button>
							<button className='btn btn-secondary' onClick={this.props.onCancelOrderClicked} type='button'>Cancel Order</button>
							<button className='btn btn-secondary' onClick={this.props.onCloseOrderClicked} type='button'>Close Order</button>
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