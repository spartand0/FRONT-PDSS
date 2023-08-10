import { StyleSheet, Font } from '@react-pdf/renderer';

import Nexus from '../../../../src/shared/css/fonts/NexusSansCompPro-Bold.ttf';
import NexusPro from '../../../../src/shared/css/fonts/NexusSansWebPro.ttf';
import NexusProBold from '../../../../src/shared/css/fonts/NexusSansWebPro-Bold.ttf';
import DejaVuSans from '../../../../src/shared/css/fonts/DejaVuSans.ttf';

Font.register({
	family: 'Nexus',
	fonts: [
		{
			src: Nexus,
			format: 'truetype'
		}
	]
});
Font.register({
	family: 'NexusPro',
	fonts: [
		{
			src: NexusPro,
			format: 'truetype'
		}
	]
});
Font.register({
	family: 'NexusProBold',
	fonts: [
		{
			src: NexusProBold
		}
	]
});
Font.register({
	family: 'DejaVuSans',
	fonts: [
		{
			src: DejaVuSans
		}
	]
});

const styles = StyleSheet.create({
	section: {
		color: '#ff8200',
		fontSize: 38,
		margin: 0,
		fontFamily: 'NexusPro'
	},

	campany: {
		fontSize: 10,
		color: '#4d4d4d',
		marginLeft: 10,
		marginTop: 15,
		marginRight: 0,
		marginBottom: 7,
		width: '33%',
		fontFamily: 'NexusPro'
	},
	img: {
		width: '40',
		height: '40',
		marginLeft: '160',
		marginTop: '5'
	},
	page: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 40,
		paddingBottom: 30,
		paddingRight: 60,
		paddingLeft: 60,
		color: '#4d4d4d',
		width: '100%'
	},
	footer: {
		paddingBottom: '8%',
		color: '#4d4d4d',
		width: '100%',
		paddingRight: 0,
		paddingLeft: 0
	},
	diagnostic: {
		fontSize: 18,
		marginTop: '20%',
		display: 'block',
		color: '#4d4d4d',
		paddingTop: 30,
		paddingBottom: 5,
		paddingRight: 60,
		paddingLeft: 60,
		fontFamily: 'Nexus',
		fontWeight: 'normal'
	},
	date: {
		paddingTop: 15,
		paddingBottom: 60,
		paddingRight: 60,
		paddingLeft: 60,
		fontSize: 10,
		color: '#4d4d4d',
		fontFamily: 'NexusPro'
	},
	line: {
		border: '0.5px solid #4d4d4d',
		borderRadius: '1px',
		marginLeft: 60,
		marginRight: 70,
		marginTop: 10
	},
	lineScore: {
		border: '2px solid red',
		borderRadius: '10px',
		marginLeft: 60,
		marginRight: '417',
		marginTop: 10
	},
	border: {
		border: '0.5px solid #4d4d4d',
		borderRadius: '1px',
		marginLeft: 60,
		marginRight: 70,
		marginTop: 10,
		color: 'red'
	},
	child: {
		paddingTop: 20,
		paddingBottom: 10,
		paddingRight: 60,
		paddingLeft: 60,
		fontSize: 14,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},

	space: {
		marginBottom: 340
	},
	profile: {
		paddingLeft: 60,
		marginBottom: 25,
		marginTop: 25,
		fontSize: 14,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},

	result: {
		fontSize: 10,
		fontFamily: 'NexusPro',
		fill: '#4d4d4d'
	},
	diagnosticTitle: {
		fontSize: 10,
		fill: '#4d4d4d',
		fontFamily: 'NexusPro',
		fontWeight: 'normal',
		fontStyle: 'normal'
	},

	value: {
		fontSize: 10,
		fill: '#4d4d4d',
		fontFamily: 'NexusPro',
		fontWeight: 'normal',
		fontStyle: 'normal'
	},
	sectionTest: {
		display: 'flex',
		alignContent: 'flex-end',
		flexDirection: 'row',
		color: '#4d4d4d',
		width: '100%'
	},
	diagnosticSection: {
		paddingLeft: 60,
		marginTop: '0%',
		fontSize: 14,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	diagnosticSectionTitle: {
		fontSize: 10,
		width: '65%',
		paddingLeft: 60,
		marginTop: 25,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	diagnosticTableTitle: {
		fontSize: 10,
		width: '85%',
		paddingLeft: 60,
		marginTop: 5,
		marginBottom: 5,
		color: '#4d4d4d',
		fontFamily: 'NexusPro'
	},
	testTitle: {
		fontSize: 10,
		width: '65%',
		paddingLeft: 60,
		marginTop: 15,
		marginBottom: 20,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	duration: {
		fontSize: 10,
		color: '#4d4d4d',
		marginTop: 23,
		textAlign: 'right',
		fontFamily: 'NexusPro'
	},
	lineSection: {
		border: '0.5px solid #4d4d4d',
		borderRadius: '1px',
		marginLeft: 60,
		marginRight: 65,
		marginTop: 17
	},
	description: {
		textAlign: 'center',
		fontSize: 10,
		fill: '#4d4d4d',
		fontFamily: 'NexusPro',
		marginRight: 10,
		marginLeft: 10,
		marginTop: 10,
		lineHeight: 2
	},
	descriptionInterval: {
		textAlign: 'center',
		fontSize: 10,
		fill: '#4d4d4d',
		fontFamily: 'NexusProBold',
		marginRight: 10,
		marginLeft: 10,
		marginTop: 10,
		lineHeight: 1
	},
	eval: {
		textAlign: 'center',
		fontSize: 10,
		fill: '#4d4d4d',
		fontFamily: 'NexusProBold',

		lineHeight: 2
	},
	score: {
		textAlign: 'center',
		fontSize: 9,
		fill: '#4d4d4d',
		fontFamily: 'NexusPro'
	},
	scoreValue: {
		textAlign: 'center',
		fontSize: 12,
		fill: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	titleTable: {
		fontSize: 10,
		width: '65%',
		paddingLeft: 60,
		marginTop: 25,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	titleEvalTable: {
		fontSize: 10,
		width: '65%',
		paddingLeft: 60,
		marginTop: 25,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},

	table: {
		display: 'table',
		marginTop: '5',
		width: 'auto',
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		marginLeft: 60,
		marginRight: 65,
		borderColor: '#4d4d4d'
	},
	tableDetailauswertung: {
		display: 'table',
		marginTop: '5',
		width: 'auto',
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderTopWidth: 1,
		borderLeftWidth: 0,
		marginLeft: 60,
		marginRight: 65,
		borderColor: '#4d4d4d'
	},
	greenScore: {
		backgroundColor: '#5fb157',
		width: '30%',
		borderWidth: 0.3,
		marginTop: 3,
		marginBottom: 3,
		marginLeft: 12,
		borderColor: '#5fb157'
	},
	redScore: {
		backgroundColor: '#b13633',
		width: '30%',
		borderWidth: 0.3,
		marginTop: 3,
		marginBottom: 3,
		marginLeft: 3,
		borderColor: '#b13633'
	},
	tableGrammatic: {
		display: 'table',
		marginTop: '10',
		width: 'auto',
		borderWidth: 0.7,
		borderRightWidth: 0.9,
		borderBottomWidth: 0.9,
		borderTopWidth: 0.9,

		marginLeft: 60,
		marginRight: 65,
		borderColor: '4d4d4d'
	},
	titleGrammatic: {
		display: 'table',
		width: 'auto',
		marginLeft: 60,
		marginRight: 65
	},
	titleGrammaticTest: {
		display: 'table',
		width: 'auto',
		marginLeft: 50,
		marginRight: 60
	},
	tableScore: {
		display: 'table',
		width: 'auto',
		borderWidth: 0.3,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		marginLeft: 60,
		marginRight: 65,
		marginTop: 0,
		borderColor: '#4d4d4d'
	},
	tableRow: {
		margin: 'auto',
		flexDirection: 'row',
		borderColor: '#4d4d4d',
		borderLeftWidth: 1
	},
	
	tableRowGrammar: {
		margin: 'auto',
		flexDirection: 'row',
		borderColor: '#4d4d4d',
	},
	tableRowGrammatic: {
		margin: 'auto',
		flexDirection: 'row',
		borderColor: '#4d4d4d',
		backgroundColor: '#f0f0ee'
	},
	titleRowGrammatic: {
		margin: 'auto',
		flexDirection: 'row'
	},
	tableScoreRow: {
		margin: 'auto',
		flexDirection: 'row',
		borderColor: '#4d4d4d'
	},
	tableNote: {
		display: 'table',
		marginTop: '5',
		width: 'auto',
		borderWidth: 0.3,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		marginLeft: 60,
		marginRight: 65,
		borderColor: '#4d4d4d'
	},
	tableNoteRow: {
		margin: 'auto',
		flexDirection: 'row',
		color: '#4d4d4d'
	},
	tableNoteContent: {
		width: '100%',
		paddingBottom: 25,
		borderWidth: 0.3,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		borderColor: '#4d4d4d'
	},
	tableScoreContent: {
		borderTop: '2px solid red',
		width: '25%',
		borderWidth: 0.3,
		borderLeftWidth: 0,
		borderTopWidth: 2,
		borderColor: '#4d4d4d'
	},
	grammatic: {
		width: '80%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	col1: {
		width: '67%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	col2: {
		width: '16%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	col3: {
		width: '17%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colHeaderGrammatic1: {
		width: '85%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d',
		borderColor: '#f0f0ee'
	},
	colGrammaticTitle1: {
		width: '50%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d',
		borderColor: '#f0f0ee'
	},
	colTitleGrammaticTitle1: {
		width: '70%'
	},
	colGrammaticTitle2: {
		width: '50%'
	},

	colHeaderGrammatic2: {
		width: '15%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d',
		borderColor: '#f0f0ee'
	},
	colGrammatic1: {
		width: '35%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d',
		borderColor: '#ffffff'
	},
	colGrammatic2: {
		width: '15%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d',
		borderColor: '#ffffff'
	},

	colAccordionSegment1: {
		width: '16%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colAccordionSegment1header: {
		width: '16%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colAccordionSegment2: {
		width: '26%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0
	},
	colAccordionSegment2header: {
		width: '26%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1
	},
	colAccordionSegment3: {
		width: '34%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},

	colAccordionSegment3header: {
		width: '34%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colDetailauswertung1: {
		width: '60%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colDetailauswertung1header: {
		width: '60%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colDetailauswertung2: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colDetailauswertung2header: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colDetailauswertung3: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colDetailauswertung3header: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},

	colAccordionDictionary1: {
		width: '57%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colAccordionDictionary1header: {
		width: '57%',
		borderWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth:0,
		maxHeight: 37,
		color: '#4d4d4d'
	},
	colAccordionDictionary2header: {
		width: '23%',
		borderWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth:0,
		maxHeight: 37,
		color: '#4d4d4d'
	},
	colAccordionDictionary3header: {
		width: '20%',
		borderWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth:0,
		maxHeight: 37,
		color: '#4d4d4d'
	},
	colAccordionPronunciation1: {
		width: '75%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colAccordionPronunciation1header: {
		width: '75%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colAccordionWord1: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	
	colAccordionWord1header: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colAccordionWord2: {
		width: '80%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colAccordionWord2header: {
		width: '80%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colAccordionPronunciation2: {
		width: '25%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},

	colAccordionPronunciation2header: {
		width: '25%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 1,
		color: '#4d4d4d'
	},
	colAccordionDictionary2: {
		width: '23%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	colAccordionDictionary3: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	available: {
		width: '20%',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		color: '#4d4d4d'
	},
	tableCellTest: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'justify',
		marginLeft: 7,
		fontSize: 9,
		color: '#4d4d4d',
		fontFamily: 'DejaVuSans'
	},
	tableCellDetailsTest: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'left',
		marginLeft: 7,
		fontSize: 9,
		color: '#4d4d4d',
		fontFamily: 'NexusPro'
	},

	grammaticDetailsTest: {
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 50,
		textAlign: 'left',
		fontSize: 9,
		color: '#4d4d4d',
		fontFamily: 'NexusPro'
	},
	tableCellHeaderTest: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'justify',
		marginLeft: 7,
		fontSize: 10,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	tableCellScoreAnswer: {
		marginTop: 10,
		marginBottom: 3,
		textAlign: 'center',
		marginLeft: 7,
		fontSize: 10,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	grammaticScoreAnswer: {
		marginTop: 5,
		marginBottom: 6,
		textAlign: 'center',

		fontSize: 10,
		color: '#ffffff',
		fontFamily: 'NexusPro'
	},
	tableCellTestTitle: {
		marginBottom: 10,
		textAlign: 'center',
		marginLeft: 7,
		fontSize: 10,
		color: '#4d4d4d',
		fontFamily: 'NexusPro'
	},
	tableCellHeaderAnswer: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'right',
		marginLeft: 7,
		marginRight: 8,
		fontSize: 9,
		color: '#4d4d4d',
		fontFamily: 'NexusProBold'
	},
	tableCellContent: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'right',
		marginLeft: 7,
		marginRight: 8,
		fontSize: 9,
		color: '#4d4d4d',
		fontFamily: 'DejaVuSans'
	},
    tableCellContent3: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'right',
		marginLeft: 7,
		marginRight: 8,
		fontSize: 9,
		lineHeight: 2,
		color: '#4d4d4d',
		fontFamily: 'DejaVuSans'
	},
	tableCellDetailsContent: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'right',
		marginLeft: 7,
		marginRight: 8,
		fontSize: 9,
		color: '#4d4d4d',
		fontFamily: 'NexusPro'
	},
	oneCell: {
		width: '100%',
		borderWidth: 1,
		borderLeftWidth: 1,
		borderTopWidth: 0,
	},
	oneCellContent: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'left',
		marginLeft: 7,
		marginRight: 8,
		fontSize: 9,
		color: '#4d4d4d',
		fontFamily: 'DejaVuSans'
	},
});
export default styles;
