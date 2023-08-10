import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import { replaceLine } from '../../../shared/helpers/properties';

const BodyTable4NSection = ({ val }) => {
	const keyValue = val[0];
	return (
		<View style={styles.tableRow}>
			<View style={styles.colAccordionSegment1}>
				<Text style={styles.tableCellTest}>{val[0]}</Text>
			</View>
			{Object.values(val[1].columns).map((value, index) => (
				<View key={keyValue} style={index == 0 ? styles.colAccordionSegment1 : styles.colAccordionSegment3}>
					{(() => {
						let result = [];
						for (let i = 0; i < value?.length; i++) {
							let content = replaceLine(value)
								.split('')
								.join('\n\n')
							if (index == 0) {
								result.push(
									<Text key={content} style={styles.tableCellContent}>
										{content}
									</Text>
								);
							} else {
								let content = replaceLine(value
									?.split('</p>')
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

export default BodyTable4NSection;
