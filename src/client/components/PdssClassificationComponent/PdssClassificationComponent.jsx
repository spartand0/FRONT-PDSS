const PdssClassificationComponent = ({
	question_id,
	label,
	id,
	checkListReferences,
	setCheckListReferences,
	classificationsResults,
	t,
    selectClassificationAdditionalOptionAnswer,
}) => {
    const handleRenderClassificationSpanContent = data => {
		switch (data.length) {
			case 1:
				return ['Obligatorisches Satzglied fehlt', 'Funktionales Element fehlt'][+data[0] - 1];
			case 2:
				return '2 ausgewählt';
			default:
				return 'Bitte wählen';
		}
	};
    const addAdditionalObjects = ({ checksContent, selectedClass, classificationItem, value }) => {
		// If checksContent does not include the new value
		if (!checksContent?.includes(value)) {
			// Add the new value to the checks array and update additional options content
			setAdditionalOptionsContent(
				{
					class: selectedClass,
					checks: [...checksContent, value]
				},
				classificationItem.id
			);
		} else {
			// Remove the new value from the checks array and update additional options content
			setAdditionalOptionsContent(
				{
					class: selectedClass,
					checks: [...checksContent.filter(x => x != value)]
				},
				classificationItem.id
			);
		}
	};
    const setAdditionalOptionsContent = (qValue, cId) =>
			selectClassificationAdditionalOptionAnswer({ id: cId, value: qValue });
	return (
		<div className="cell" onClick={() => checkListReferences && setCheckListReferences(null)}>
			<label for={question_id}>{label}</label>
			<div className="legend">
				<p>
					<span className="green"></span>Vollständig
				</p>
				<p>
					<span className="red"></span>Unvollständig
				</p>
				<p>
					<span className="grey"></span>Elipse
				</p>
			</div>
			<div className="answers" id={id}>
				<ul>
					{classificationsResults.map(classificationItem => {
						let additionalData = JSON.parse(classificationItem?.additional);
						let selectedClass = additionalData?.class;
						let checksContent = additionalData?.checks?.length > 0 ? additionalData?.checks : [];

						return (
							classificationItem.answer.length > 0 && (
								<li
									className={selectedClass}
									data-id={question_id}
									data-belonging={classificationItem.belonging_id}
									id={classificationItem.id}
									key={'classification_' + classificationItem.id}
								>
									<p>
										<span className="num">{classificationItem.belonging_id}.</span>
										<span className="text"> {classificationItem.answer}</span>
									</p>

									<select
										className="class"
										onChange={e =>
											setAdditionalOptionsContent(
												{ class: e.target.value },
												classificationItem.id
											)
										}
									>
										<option>Bitte wählen</option>

										<option value={'green'} selected={selectedClass == 'class'}>
											{t('label_classification_question_classes.green')}
										</option>
										<option value={'red'} selected={selectedClass == 'class'}>
											{t('label_classification_question_classes.red')}
										</option>
										<option value={'grey'} selected={selectedClass == 'class'}>
											{t('label_classification_question_classes.grey')}
										</option>
									</select>

									{selectedClass == 'red' && (
										<div
											id="ms-list-2"
											className={`ms-options-wrap ms-active ${
												checksContent.length > 0 && 'ms-has-selections'
											} `}
										>
											<button
												type="button"
												onClick={e => {
													e.stopPropagation();
													setCheckListReferences(
														checkListReferences !== classificationItem?.id &&
															classificationItem?.id
													);
												}}
											>
												<span>{handleRenderClassificationSpanContent(checksContent)}</span>
											</button>

											{checkListReferences === classificationItem?.id ? (
												<div
													onClick={e => {
														e.stopPropagation();
													}}
													className="ms-options"
													style={{ minHeight: '200px', maxHeight: '248px' }}
												>
													<ul style={{ columnCount: '1', columnGap: '0px' }}>
														<li
															data-search-term="obligatorisches satzglied fehlt "
															className={`${checksContent?.includes('1') && 'selected'} `}
														>
															<label for="ms-opt-3">
																<input
																	onChange={e =>
																		addAdditionalObjects({
																			checksContent,
																			selectedClass,
																			classificationItem,
																			value: '1'
																		})
																	}
																	type="checkbox"
																	title="Obligatorisches Satzglied fehlt"
																	id="ms-opt-3"
																	value="1"
																/>
																Obligatorisches Satzglied fehlt
															</label>
														</li>
														<li
															data-search-term="funktionales element fehlt"
															className={`${checksContent?.includes('2') && 'selected'} `}
														>
															<label for="ms-opt-4">
																<input
																	onChange={e =>
																		addAdditionalObjects({
																			checksContent,
																			selectedClass,
																			classificationItem,
																			value: '2'
																		})
																	}
																	type="checkbox"
																	title="Funktionales Element fehlt"
																	id="ms-opt-4"
																	value="2"
																/>
																Funktionales Element fehlt
															</label>
														</li>
													</ul>
												</div>
											) : null}
										</div>
									)}

									<span
										onClick={e => setAdditionalOptionsContent({}, classificationItem.id)}
										className="reset entypo-back"
										title={t('subheadline_results_extended')}
									></span>
								</li>
							)
						);
					})}
				</ul>
			</div>
		</div>
	);
};
export default PdssClassificationComponent;
