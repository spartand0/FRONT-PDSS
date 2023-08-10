import {Text, View } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const MessageSection = ({ label,text }) => {
	return (
		<View wrap={false} style={styles.tableNote}>
			<View style={styles.tableNoteRow}>
				<View style={styles.tableNoteContent}>
					<Text style={styles.description}>{label}</Text>
					<Text style={styles.description}>{text}</Text>
				</View>
			</View>
		</View>
	);
};

export default MessageSection;
