import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import { replaceLine } from '../../../shared/helpers/properties';

const BodyTable5NSection = ({ val }) => {
	const keyValue = val[0];
	return (
		<View wrap={false} style={styles.tableRow}>
			<View style={styles.colAccordionSegment1}>
				<Text style={styles.tableCellTest}>{val[0]}</Text>
			</View>

			{Array.from(val[1].columns).map((value, index) => (
				<View key={keyValue} style={index == 1 || index == 3 ? styles.colAccordionSegment2 : styles.colAccordionSegment1}>
					{(() => {
						let result = [];
						for (let i = 0; i < value?.length; i++) {
							if (index === 0) {
								let content = (replaceLine(Array.from(val[1].columns)
								[index]))
									.split('')
									.join('\n\n')
								result.push(
									<Text key={content} style={styles.tableCellContent}>
										{content}
									</Text>
								);
							} else {
								let content = replaceLine(Array.from(val[1].columns)
								[index]?.split('</p>')
									.join('\n\n'))
								result.push(
									<Text key={content} style={styles.tableCellContent}>
										{content}
									</Text>
								);
							}
						}
						return result[0];
					})()}
				</View>
			))}
		</View>
	);
};

export default BodyTable5NSection;
