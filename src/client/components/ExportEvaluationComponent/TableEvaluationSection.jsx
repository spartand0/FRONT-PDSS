import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
const TableEvaluationSection = ({ t, data }) => {
	let evalData = Object.values(data);
	const evalDataStyle = {
		0: styles.colDetailauswertung1header,
		1: styles.colDetailauswertung2header,
		default: styles.colDetailauswertung3header,
	  };
	return (
		<>
			<View style={styles.tableDetailauswertung}>
				<View style={styles.tableRow}>
					{evalData[0].map((item, index) =>
						evalData[0].length == 3 ? (
							<View
								wrap={false}
								style={evalDataStyle[index] || evalDataStyle.default}
							>
								<Text
									wrap={false}
									style={index == 0 ? styles.tableCellHeaderTest : styles.tableCellHeaderAnswer}
								>
									{t(`table_head_${item}`)}
								</Text>
							</View>
						) : (
							<View wrap={false} style={index == 0 ? styles.grammatic : styles.available}>
								<Text
									wrap={false}
									style={index == 0 ? styles.tableCellHeaderTest : styles.tableCellHeaderAnswer}
								>
									{t(`table_head_${item}`)}
								</Text>
							</View>
						)
					)}
				</View>
				{Object.entries(evalData[1]).map(test =>
					evalData[0].length == 3 ? (
						<View style={styles.tableRow}>
							<View style={styles.colDetailauswertung1}>
								<Text style={styles.tableCellDetailsTest}>{test[1].name?test[1].name:test[0]}</Text>
							</View>
							<View style={styles.colDetailauswertung2}>
								<Text style={styles.tableCellDetailsContent}>{test[1].mistakes_per_items}</Text>
							</View>
							<View style={styles.colDetailauswertung3}>
								<Text style={styles.tableCellDetailsContent}>{test[1].error_distribution}</Text>
							</View>
						</View> 
					) : (
						<View style={styles.tableRow}>
							<View style={styles.grammatic}>
								<Text style={styles.tableCellDetailsTest}>{test[1].label?test[1].label:test[0]}</Text>
							</View>
							<View style={styles.available}>
								<Text style={styles.tableCellDetailsContent}>{test[1].score}</Text>
							</View>
						</View>
					)
				)}
			</View>
		</>
	);
};
export default TableEvaluationSection;
