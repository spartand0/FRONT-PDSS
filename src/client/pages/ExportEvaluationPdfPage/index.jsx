import { useState, useEffect } from 'react';
import ExportEvaluationComponent from '../../components/ExportEvaluationComponent';
import { PDFViewer } from '@react-pdf/renderer';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnalysesList, selectDataToExport } from '../../../store/reducers/evaluation.reducers';
import { action_evaluation_getAll, action_evaluation_getDataToExport } from '../../../store/actions';

const ExportEvaluationPdfPage = props => {
	const selectedChild = localStorage?.getItem('selected_child');
	const [loader, setLoader] = useState(true);
	const dispatch = useDispatch()
	const analysisScores = useSelector(selectDataToExport);
	const analysesList = useSelector(selectAnalysesList);
	useEffect(() => {
		dispatch(action_evaluation_getAll(selectedChild));
		dispatch(action_evaluation_getDataToExport({
			childId: selectedChild,
			diagnosticId: localStorage?.getItem('diagnosticsToExport')
				? localStorage?.getItem('diagnosticsToExport')
				: ''
		})).then(() => {
			setLoader(false)
		});
	}, [selectedChild]);

	useEffect(() => {
			document.documentElement.classList.add('is-reveal-open');
	}, []);
	
	if (loader) return <FullScreenLoaderContainer />;
	return (
		<PDFViewer height="100%" width="100%" showToolbar={true}>
			<ExportEvaluationComponent
				{...props}
				selectedChild={selectedChild}
				analysesList={analysesList}
				analysisScores={analysisScores}
			/>
		</PDFViewer>
	);
};

export default ExportEvaluationPdfPage
