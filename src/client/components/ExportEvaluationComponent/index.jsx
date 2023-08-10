import React, { createContext } from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import HeaderSection from './HeaderSection';
import BarChartSection from './BarChartSection';
import ChildSection from './ChildSection';
import TestDetailsComponent from './TestDetailsComponent';
import styles from './styleExportPdf';

export const ContextResult = createContext({});
export default function ExportEvaluationComponent(props) {
	const { t, analysisScores, analysesList } = props;
	return (
		<Document title="Export">
			<Page orientation="portrait" size="A4">
				<HeaderSection t={t} />
				<ChildSection t={t} analysisScores={analysisScores} />
				<View fixed style={styles.footer}></View>
			</Page>
			<Page orientation="portrait" size="A4">
				<HeaderSection t={t} />
				<BarChartSection t={t} diagnosticResult={analysesList} />
				<View fixed style={styles.footer}></View>
			</Page>
			{analysisScores?.evaluations &&
				analysisScores?.evaluations.length > 0 &&
				analysisScores?.evaluations.map((data) => (
					<Page orientation="portrait" size="A4" key={data.diagnosticDetails[0]?.title}>
						<HeaderSection t={t} />
						<TestDetailsComponent
							{...props}
							t={props.t}
							testDetails={data}
							child={analysisScores?.child}
						/>
						<View fixed style={styles.footer}></View>
					</Page>
				))}
		</Document>
	);
}
