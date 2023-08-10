import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import moment from 'moment';
import styles from './styleExportPdf';
import ScoreSection from './ScoreSection';
import TableEvaluationSection from './TableEvaluationSection';
import MessageSection from './MessageSection';
import AccordionDictionarySection from './AccordionDictionarySection';
import CompactValuesSection from './CompactValuesSection';
import TableGrammaticTest from './TableGrammaticTest';

const TestDetailsComponent = ({ t, testDetails, child }) => {
	let hideFromExport = [
		'Detaillierte Auswertung',
		'Fragen',
		'Antworten',
		'Empfehlung zur Grammatikauswertung',
		'Keine Grammatikauswertung notwendig',
		'Empfehlung zur Detailauswertung'
	];
	let hideFromDetail = ['Detailauswertung', 'Ergebnisübersicht'];

	const renderSectionComponent = (test) => {
		let sectionComponent;
		switch (test.type) {
			case 'values':
				sectionComponent = <ScoreSection t={t} test={test.data} />;
				break;
			case 'compact_values':
				sectionComponent = <CompactValuesSection t={t} test={test.data} />;
				break;
			case 'accordion':
				sectionComponent = <AccordionDictionarySection t={t} dataAccordion={test.data.accordion} />;
				break;
			case 'message':
				if (test.score_name !== t('note_age_child')) {
					sectionComponent = (
						<MessageSection
							label={t(test?.data.label)}
							text={test?.data?.append_text?.replace('<br/>', '')}
						/>
					);
				} else {
					sectionComponent = '';
				}
				break;
			default:
				if (test.score_name.includes(t('Detail_evaluation'))) {
					sectionComponent = <TableEvaluationSection t={t} data={test.data} />;
				} else {
					sectionComponent = '';
				}
				break;
		}
		return sectionComponent;
	}

	return (
		<>
			<Text x="60" y="40" style={styles.diagnosticSection}>
				{testDetails.diagnosticDetails[0].title}
			</Text>
			<view style={styles.sectionTest}>
				<Text style={styles.diagnosticSectionTitle}>{testDetails.diagnosticDetails[0].subtitle}</Text>
				<Text style={styles.duration}>
					{t('child_option_test_date')} :
					{' ' + moment(testDetails.sessionDetails[0].date_initialized).format('DD.MM.YYYY HH:mm')}
				</Text>
			</view>
			<hr style={styles.lineSection}></hr>
			{child[0]?.languages?.length > 1 && testDetails.diagnostic != '10' && (
				<>
					<Text style={styles.diagnosticSectionTitle}>{t('note_age_child')}</Text>
					<MessageSection label={''} text={t('label_bilingual_child')} />
				</>
			)}

			{testDetails.tests &&
				testDetails.tests.length &&
				testDetails.tests.map((test) => (
					<React.Fragment key={test.score_name}>
						{(localStorage?.getItem('option_export') == 'true' &&
							!hideFromExport.includes(test.score_name)) ||
							(localStorage?.getItem('option_export') == 'false' &&
								!hideFromExport.concat(hideFromDetail).includes(test.score_name)) ? (
							test.type == 'accordion' ?
								<View >
									{test.score_name != t('note_age_child') && (
										<Text style={styles.testTitle} >{test.score_name}</Text>
									)}
									{renderSectionComponent(test)}
								</View> :
								<View wrap={false}>
									{test.score_name != t('note_age_child') && (
										<Text style={styles.testTitle} >{test.score_name}</Text>
									)}
									{renderSectionComponent(test)}
								</View>
						) : (
							<Text></Text>
						)}
					</React.Fragment>
				))}
			{testDetails.diagnostic == '5' ? <TableGrammaticTest analysisGrammarScores={testDetails.grammars} /> : ''}
			{testDetails.diagnostic == '10' && (
				<>
					<Text style={styles.diagnosticSectionTitle}>{t('note_age_child')}</Text>
					<MessageSection label={''} text={t('label_do_extended_analysis_for_tvalue')} />
				</>
			)}
		</>
	);
};

export default TestDetailsComponent;
