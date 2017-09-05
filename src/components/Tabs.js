import React from 'react';
import PropTypes from 'prop-types';
import {formatToDollars, getOpenRecords} from '../utils/utils';
import orderBy from 'lodash/orderBy';


/**
 * Tabs (button lists)
 * @param props
 * @returns {XML}
 * @constructor
 */
const Tabs = (props) =>{

	const tabItems = orderBy(getOpenRecords(props.tabItems), ['id'], ['desc']);

	return (
		<ul className={`tabs ${props.tabWrapperClassName}`}>
			{tabItems.map((item) =>{
				const isActiveItem = props.activeItemId === item[props.identifier];
				const listItemClasses = `${props.tabItemClassName} ${(isActiveItem) ? 'active' : ''}`;
				const buttonClasses = `btn-link ${(isActiveItem) ? 'active' : ''}`;
				const itemSubTitle = item[props.itemSubTitleKey];
				return (
					<li key={item[props.identifier]} className={listItemClasses}>
						{/* Binding the onClick handler to createTabItem scope so we can pass back the entire "item" object, else we can only pass back event, which doesn't get us item.id. Using button for A11y, semantics, and not to unnecessarily add a hash to the URL. <a> would be better if we were going to a new page */}
						<button onClick={() => props.handleItemClick(item)} className={buttonClasses}>
							<span>Purchase ID: {item[props.itemTitleKey]}</span> <br/>
							<span className="sub-title">{formatToDollars(itemSubTitle)}</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default Tabs;

Tabs.propTypes = {
	tabItems:            PropTypes.array,
	tabWrapperClassName: PropTypes.string,
	tabItemClassName:    PropTypes.string,
	identifier:          PropTypes.string.isRequired,
	activeItemId:        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleItemClick:     PropTypes.func,
	itemTitleKey:        PropTypes.string,
	itemSubTitleKey:     PropTypes.string
};