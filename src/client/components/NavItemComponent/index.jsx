import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavItemComponent = ({
	title, // The title of the NavItem.
	path, // The path that the NavItem links to.
	parentId, // The ID of the parent NavItem, if applicable.
	icon, // The name of the icon to display, if not using textIcons.
	textIcons, // Whether to use text-based icons or not.
	children, // Any child components of the NavItem.
	extraClasses, // Any additional CSS classes to apply to the NavItem.
	className, // The CSS class to apply to the NavItem.
	action, // The action to perform when the NavItem is clicked.
	currentRouter: { navigate } // The current router object.
}) => {
	return (
		<Link className={className ? className : ''} id={parentId} to={path} onClick={e => action && action(e)}>
			{textIcons ? children : <span className={'entypo entypo-' + icon}></span>}
			{title}
		</Link>
	);
};

NavItemComponent.propTypes = {
	title: PropTypes.string, // The title of the NavItem.
	iconClassName: PropTypes.string, // The name of the icon to display, if not using textIcons.
	path: PropTypes.any // The path that the NavItem links to.
};

NavItemComponent.defaultProps = {
	title: '', // The default title is an empty string.
	path: '' // The default path is an empty string.
};

export default WithRouter(NavItemComponent);
