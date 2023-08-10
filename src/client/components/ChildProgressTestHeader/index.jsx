const ChildProgressTestHeader = ({progress}) => {
	return (
		<div className="header">
			<div className="grid-container">
				<div className="grid-x process-for-child">
					<div className="cell">
						<div className="bg">
							<span className="bar" style={{ width: '10%' }}></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChildProgressTestHeader;
