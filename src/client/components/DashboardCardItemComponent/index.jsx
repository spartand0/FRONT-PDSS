import React from 'react';
import { Link } from 'react-router-dom';
import { NavListContainer } from '../../containers/NavListContainer';
import PdssIconBoxComponent from '../PdssIconBoxComponent';

// A function component to display a dashboard card item
function DashboardCardItemComponent({ card }) {
	return (
		<div className="cell large-4 medium-6">
			<div className="box">
				{/* Renders the card icon */}
				<PdssIconBoxComponent icon={card.icon} />
				<div className="padding">
					{/* Renders the navigation list */}
					<NavListContainer additionalClass="option-list" navList={card.navList} />
					{/* Renders the card's title and link */}
					<p>
						<Link className="button" to={card.path}>
							{card.title}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default DashboardCardItemComponent;
