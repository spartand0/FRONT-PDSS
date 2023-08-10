import React from 'react';
import { useSelector } from 'react-redux';
import { selectTemplateHideBox, selectTemplateTitle } from '../../../store/reducers/settings.reducer';

function ContainerHeaderLayout({ children }) {

	const title = useSelector(selectTemplateTitle)
	const hideWhiteBox = useSelector(selectTemplateHideBox)
	return (
		<section>
			<div className="keyvisual">
				<div className="bg"></div>
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell">
							<h1>{title}</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="content">
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell">
							<div className={hideWhiteBox ? '' : 'box'}>
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContainerHeaderLayout;
