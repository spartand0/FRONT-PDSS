import React from 'react';
import { navLinkIsActive } from '../../../shared/helpers/properties';
import NavItemComponent from '../../components/NavItemComponent';

export const NavListContainer = ({ navList, additionalClass, event, handleChange })  => {

	const closeMenu = () => {
        if (event) event(false);
        if (handleChange) handleChange(false);
	}

	return (
		<ul className={additionalClass ? additionalClass : 'clearfix'}>
			{navList?.map((item, index) => (
				<li key={item.key} className={item?.extraClasses + ' ' + navLinkIsActive(item)} onClick={closeMenu}>
					<NavItemComponent {...item} />
				</li>
			))}
		</ul>
	);
};
