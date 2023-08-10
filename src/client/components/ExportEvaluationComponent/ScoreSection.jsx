import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
const ScoreSection = ({ t, test }) => {
	const interpretation = test?.interpretation;
	const color = interpretation < 0 ? '#b13633' : '#5fb157';
	let decimal = 0;
	const testTypes = [
		{
			title: t('score_label_raw_value'),
			value: test?.values.raw_value,
			label: 'rawValue',
			decimal: test?.decimals
		},
		{
			title: t('score_label_score'),
			value: test?.values.score,
			label: 'score',
			decimal: test?.decimals
		},
		{
			title: t('score_label_tvalue'),
			value: test?.values.tvalue,
			label: 'tvalue',
			decimal: test?.decimals
		},
		{
			title: t('score_label_confidence_interval'),
			value: test?.values.confidence_interval,
			label: 'confidenceInterval',
			decimal: test?.decimals
		}
	];
	return (
		<>
			<View wrap={false} style={styles.tableScore}>
				<View style={styles.tableScoreRow}>
					{testTypes &&
						testTypes.map((item) => {
							decimal = item.decimal || 0;
							return (
								<>
									<View
										key={item.title}
										style={{
											borderTop: `2px solid ${item.label == 'tvalue' ? color : '#4d4d4d'}`,
											width: '25%',
											borderWidth: 0.3,
											borderLeftWidth: 0,
											borderTopWidth: 3
										}}
									>
										<Text style={styles.tableCellScoreAnswer}>
											{item.title != t('score_label_raw_value')
												? item.value
												: Number(item.value).toFixed(decimal).replace('.', ',')}
										</Text>
										<Text style={styles.tableCellTestTitle}>{item.title}</Text>
									</View>
								</>
							);
						})}
				</View>
			</View>
			<View style={styles.tableNote}>
				<View style={styles.tableNoteRow}>
					<View style={styles.tableNoteContent}>
						<Text style={styles.description}>
							{t('score_interpretation_first_label')}
							<Text style={styles.diagnosticSectionTitle}>
								{t(`score_interpretation_${interpretation}_label`)}
							</Text>
							{t('score_interpretation_end_label')}
						</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export default ScoreSection;
