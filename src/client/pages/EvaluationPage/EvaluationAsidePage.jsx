import React from 'react';
import EvaluationAsideContainer from '../../containers/EvaluationAsideContainer';

function EvaluationAsidePage({ children, handleChange, t, HandleScrollToTop }) {
	return (
		<div className="grid-x grid-margin-x">
			<div className="cell medium-4">
				<EvaluationAsideContainer
					t={t}
					handleChange={handleChange}
					HandleScrollToTop={HandleScrollToTop}
				/>
			</div>
			{children}
		</div>
	);
}
export default EvaluationAsidePage;
