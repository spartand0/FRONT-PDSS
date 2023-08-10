import PdssWarningMessageComponent from '../PdssWarningMessageComponent';

const PauseScreenComponent = ({ message }) => {
	return (
		<div className="pause-screen" style={{ visibility: 'visible', opacity: 1 }}>
			<div className="grid-container">
				<div className="grid-x align-center align-middle">
					<div className="medium-6">
						<PdssWarningMessageComponent message={message} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PauseScreenComponent;
