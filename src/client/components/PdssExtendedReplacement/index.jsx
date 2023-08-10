import { useContext, Fragment } from 'react';

const PdssExtendedReplacement = props => {
	const { ContextExtendedResult } = props;
	const { ref, elements, articulations, setUpdate, setElements } = useContext(ContextExtendedResult);

	let formattedData = articulations?.reduce((formattedArticulations, { type, id, name, short }) => {
		if (!formattedArticulations[type]) formattedArticulations[type] = [];
		formattedArticulations[type].push({ id, name, short });
		return formattedArticulations;
	}, {});
	formattedData?.Artikulationsart.unshift({ id: 0, name: 'Artikulationsart' });
	formattedData?.Artikulationsort.unshift({ id: 0, name: 'Artikulationsort' });
	formattedData?.Stimmhaftigkeit.unshift({ id: 0, name: 'Stimmhaftigkeit' });

	const handleChangeSelect = data => event => {
		const { key, index } = data;
		switch (event.target.name) {
			case 'firstOption': {
				elements[key].letters[index].replacements.firstOption.value = event.target.value;
				elements[key].letters[index].replacements.firstOption.name =
					event.target.options[event.target.selectedIndex].text;
				elements[key].letters[index].replacements.key = key;
				elements[key].letters[index].replacements.index = index;
				break;
			}
			case 'secondOption': {
				elements[key].letters[index].replacements.secondOption.value = event.target.value;
				elements[key].letters[index].replacements.secondOption.name =
					event.target.options[event.target.selectedIndex].text;
				elements[key].letters[index].replacements.key = key;
				elements[key].letters[index].replacements.index = index;
				break;
			}
			case 'thirdOption': {
				elements[key].letters[index].replacements.thirdOption.value = event.target.value;
				elements[key].letters[index].replacements.thirdOption.name =
					event.target.options[event.target.selectedIndex].text;
				elements[key].letters[index].replacements.key = key;
				elements[key].letters[index].replacements.index = index;
				break;
			}
		}
		// ___________ Respect same logic ____________ //
		let finalData = [];
		elements.map(x => finalData.push(...x.letters));
		const dataSet = {
			replacements: [
				...finalData
					.map(element => {
						return element.replacements;
					})
					.filter(x => x.key !== '')
			]
		};
		ref.current.firstChild.setAttribute('data-json', btoa(encodeURIComponent(JSON.stringify(dataSet))));
		setElements([...elements]);
		setUpdate(true);
	};
	return (
		<ul>
			{elements?.map((element, key) => {
				return element.letters.map((child, index) => {
					const { letter, replacement, type, elementKey } = child;
					return (
						child.replacement &&
						child.type !== 'added' &&
						!child.hasClass.includes('added') && (
							<li key={elementKey}>
								<div className="grid-x">
									<div className="cell small-3">
										<div className="replaced-by clearfix">
											<span className="letter original">{letter}</span>
											<span className="letter replaced">{replacement}</span>
										</div>
									</div>
									<div className="cell small-9">
										{type === 'consonants' && (
											<div className="selects">
												{elements[0]?.dataJson?.replacements.length > 0 ? (
													elements[0]?.dataJson?.replacements.map(rep => {
														return (
															<div className="grid-x" key={`grid-${rep.index}`}>
																{rep.key === key && rep.index === index && (
																	<Fragment key={rep.index}>
																		<div className="cell small-4">
																			<select
																				onChange={handleChangeSelect({
																					letter,
																					key,
																					index
																				})}
																				name="firstOption"
																			>
																				{formattedData?.Artikulationsort.map(
																					articulation => {
																						return (
																							<option
																								value={articulation.id}
																								key={articulation.id}
																								selected={
																									articulation.id ===
																									parseInt(
																										rep.firstOption
																											.value
																									)
																								}
																							>
																								{articulation.name}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</div>
																		<div className="cell small-4">
																			<select
																				onChange={handleChangeSelect({
																					letter,
																					key,
																					index
																				})}
																				name="secondOption"
																			>
																				{formattedData?.Artikulationsart.map(
																					articulation => {
																						return (
																							<option
																								value={articulation.id}
																								key={articulation.id}
																								selected={
																									articulation.id ===
																									parseInt(
																										rep.secondOption
																											.value
																									)
																								}
																							>
																								{articulation.name}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</div>
																		<div className="cell small-4">
																			<select
																				onChange={handleChangeSelect({
																					letter,
																					key,
																					index
																				})}
																				name="thirdOption"
																			>
																				{formattedData?.Stimmhaftigkeit.map(
																					articulation => {
																						return (
																							<option
																								value={articulation.id}
																								key={articulation.id}
																								selected={
																									articulation.id ===
																									parseInt(
																										rep.thirdOption
																											.value
																									)
																								}
																							>
																								{articulation.name}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</div>
																	</Fragment>
																)}
															</div>
														);
													})
												) : (
													<div className="grid-x">
														<div className="cell small-4">
															<select
																onChange={handleChangeSelect({
																	letter,
																	key,
																	index
																})}
																name="firstOption"
															>
																{formattedData?.Artikulationsort.map(articulation => {
																	return (
																		<option
																			value={articulation.id}
																			key={articulation.id}
																		>
																			{articulation.name}
																		</option>
																	);
																})}
															</select>
														</div>
														<div className="cell small-4">
															<select
																onChange={handleChangeSelect({
																	letter,
																	key,
																	index
																})}
																name="secondOption"
															>
																{formattedData?.Artikulationsart.map(articulation => {
																	return (
																		<option
																			value={articulation.id}
																			key={articulation.id}
																		>
																			{articulation.name}
																		</option>
																	);
																})}
															</select>
														</div>
														<div className="cell small-4">
															<select
																onChange={handleChangeSelect({
																	letter,
																	key,
																	index
																})}
																name="thirdOption"
															>
																{formattedData?.Stimmhaftigkeit.map(articulation => {
																	return (
																		<option
																			value={articulation.id}
																			key={articulation.id}
																		>
																			{articulation.name}
																		</option>
																	);
																})}
															</select>
														</div>
													</div>
												)}
											</div>
										)}
									</div>
								</div>
							</li>
						)
					);
				});
			})}
		</ul>
	);
};

export default PdssExtendedReplacement;
