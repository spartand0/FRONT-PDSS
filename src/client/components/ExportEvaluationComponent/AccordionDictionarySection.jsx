import React, { Fragment } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TableAccodionEvaluationSection from './TableAccordionEvaluationSection';
const AccordionDictionarySection = ({ t, dataAccordion }) => {
	return Object.entries(dataAccordion).map((item) => (
		<View>
			<TableAccodionEvaluationSection t={t} item={item} />
		</View>
	));
};
export default AccordionDictionarySection;
