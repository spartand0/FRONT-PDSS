import React from 'react';
import { Text, Rect, Line, Svg } from '@react-pdf/renderer';
import styles from './styleExportPdf';
const BarChartSection = ({t, diagnosticResult }) => {
	const nullVal = (null || 0);
	return (
		<>
			<Text style={styles.profile}> {t('label_profile')} </Text>
			<Svg>
				<Line x1="60" y1="0" x2="85" y2="0" strokeWidth={0.6} stroke="black" /> 
				<Text style={styles.result} x="65" y="10">
					100
				</Text>
				{diagnosticResult &&
					diagnosticResult
						.filter(d => d.has_sublabel === 'no')
						.map((item, index) => {
							const visible = item.tvalue == nullVal || item.session == null
							return (
								<React.Fragment key={item.tvalue}>
									<Line
										x1={index * 25 + 85}
										y1="0"
										x2={index * 25 + 110}
										y2="0"
										strokeWidth={1}
										stroke="black"
									/>
									<Rect
										style={styles.tests}
										width="25"
										height="120"
										fill={visible ? '#d6d6d5' : '#f0f0ee'}
										x={index * 25 + 85}
										y="0.5"
									/>
									<Rect
										style={styles.tests}
										width="25"
										height="70"
										fill={visible ? '#d6d6d5' : '#daead7'}
										x={index * 25 + 85}
										y="120"
									/>
									<Rect
										style={styles.tests}
										width="25"
										height="120"
										fill={visible ? '#d6d6d5' : '#ead2d0'}
										x={index * 25 + 85}
										y="180"
									/>
									<Line
										x1={index * 25 + 85}
										y1="0"
										x2={index * 25 + 85}
										y2="300"
										strokeWidth={0.2}
										stroke="black"
									/>
									<Line x1="510" y1="0" x2="510" y2="300" strokeWidth={0.1} stroke="black" />
									{item.tvalue != nullVal && item.session != null ? (
										<>
											<Text
												style={styles.value}
												x={index * 25 + 92}
												y={
													item.tvalue * 3.3 < 155
														? 150 + (155 - item.tvalue * 3.3)
														: 150 - (item.tvalue * 3.3 - 155)
												}
											>
												{item.tvalue}
											</Text>
											<Line
												x1={index * 25 + 85}
												y1={
													item.tvalue * 3.3 < 155
														? 155 + (155 - item.tvalue * 3.3)
														: 155 - (item.tvalue * 3.3 - 155)
												}
												x2={index * 25 + 110}
												y2={
													item.tvalue * 3.3 < 155
														? 155 + (155 - item.tvalue * 3.3)
														: 155 - (item.tvalue * 3.3 - 155)
												}
												strokeWidth={2.5}
												stroke={item.tvalue >= 40 ? '#5fb157' : '#b13633'}
											/>
										</>
									) : (
										''
									)}
									<Text style={styles.result} x={90 + index * 25} y="290">
										{item.label}
									</Text>
								
									<Line
										x1={index * 25 + 85}
										y1="300"
										x2={index * 25 + 110}
										y2="300"
										strokeWidth={0.3}
										stroke="black"
									/>
								</React.Fragment>
							);
						})}
				{diagnosticResult &&
					diagnosticResult
						.filter(d => d.has_sublabel === 'no')
						.map((diagnostic, index) => {
							let prefix = '';
							return (
								<React.Fragment key={diagnostic.diagnostic}>
									{diagnosticResult
										.filter(t => t.has_sublabel === 'yes' && t.diagnostic === diagnostic.diagnostic)
										.map(test => {
											prefix = test.name;
										})}
									<Text
										style={styles.diagnosticTitle}
										transform={'rotate(90deg) translate(325,' + (-90 - index * 25) + ')'}
									>
										{prefix ? prefix + ': ' + diagnostic.name : diagnostic.name}{' '}
									</Text>
								</React.Fragment>
							);
						})}
				<Line x1="60" y1="300" x2="85" y2="300" strokeWidth={0.3} stroke="black" />
				<Text style={styles.result} x="70" y="290">
					0
				</Text>
			</Svg>
		</>
	);
};

export default BarChartSection;
