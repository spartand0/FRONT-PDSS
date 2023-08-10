import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
const CompactValuesSection = ({  test }) => {
	const testDetails = test?.values;
	let decimal = 0;
	return (
		<>
			<View style={styles.tableScore}>
				<View style={styles.tableScoreRow}>
					{testDetails &&
						testDetails.map((item) => {
							decimal = item.decimals || 0;
							return item.tvalue ? (
								<>
									{decimal}

									<View
										key={item.name}
										style={{
											borderTop: `2px solid ${item.class == 'green' ? '#5fb157' : '#b13633'}`,
											width: '25%',
											borderWidth: 0.3,
											borderLeftWidth: 0,
											borderTopWidth: 3
										}}
									>
										<Text style={styles.tableCellScoreAnswer}>
											{decimal === 0
												? Math.trunc(item.raw_value)
												: Number(item.raw_value).toFixed(decimal).replace('.', ',')}
											{item.name === 'Vollständigkeit' ? '%' : ''}
										</Text>
										<Text style={styles.tableCellTestTitle}>{item.name}</Text>
									</View>
								</>
							) : (
								''
							);
						})}
				</View>
			</View>
			<View style={styles.tableNote}>
				<View style={styles.tableNoteRow}>
					<View
						style={{
							borderTop: `2px solid #4d4d4d`,
							width: '100%',
							borderWidth: 0.3,
							borderLeftWidth: 0,
							borderTopWidth: 3
						}}
					>
						<Text style={styles.descriptionInterval}>{testDetails.slice(-1)[0].raw_value}</Text>
						<Text style={styles.description}>{testDetails.slice(-1)[0].name}</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export default CompactValuesSection;
