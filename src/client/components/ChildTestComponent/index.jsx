import ChildProgressTestHeader from '../ChildProgressTestHeader';
import TestImageComponent from '../TestImageComponent';

const ChildTestComponent = () => {
	return (
		<section>
			<div className="test login child_mode started first-item">
				<ChildProgressTestHeader progress />
				<div className="content">
					<div className="grid-container" style={{ height: '100vh' }}>
						<TestImageComponent />
					</div>
				</div>
			</div>
		</section>
	);
};

export default ChildTestComponent;
