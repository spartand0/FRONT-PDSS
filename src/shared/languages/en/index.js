import home from './home.json';
import child from './child.json';
import diagnosis from './diagnosis.json';
import securities from './securities.json';
import diagnosisDetails from './diagnosisDetails.json';
import dashboard from './dashboard.json';
import diagnosisExpand from './diagnosisExpand.json';
import evaluation from './evaluation.json';
import diagnosisRecord from './diagnosisRecord.json';
import diagnosticQuestionExtended from './diagnosticQuestionExtended.json';
const deLocals = {
	translations: {
		...diagnosisExpand,
		...home,
		...child,
		...securities,
		...diagnosis,
		...diagnosisDetails,
		...dashboard,
		...diagnosticQuestionExtended,
		...evaluation,
		...diagnosisRecord
	}
};
export default deLocals;
