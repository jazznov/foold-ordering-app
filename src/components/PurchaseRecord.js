import React from 'react';
import {formatToDollars} from '../utils/utils';

const PurchaseRecord = ({purchaseRecord}) =>{
	return (
		<section className="purchase-record-content">
			<h4>Purchase Record ID: {purchaseRecord.id}</h4>
			<p>Total Cost: {formatToDollars(purchaseRecord.totalCost)}</p>
			<ul> {purchaseRecord.items.map((item, index) =>{
				return (
					<li key={index}>
						<h5>{item.title}</h5>
						<ul>
							<li>Quantity: {item.quantity}</li>
							<li>Unit Cost: {formatToDollars(purchaseRecord.totalCost)}</li>
						</ul>
					</li>
				);
			})}</ul>
		</section>
	);
};

export default PurchaseRecord;