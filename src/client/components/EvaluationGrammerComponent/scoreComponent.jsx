import React, { useState } from 'react';

const ScoreComponent = ({ grammar_scores }) => {
	const [isOpen, setIsOpen] = useState({});
	const groupedScores = grammar_scores.reduce((acc, item) => {
		const group_name = item.group_name;

		if (!acc[group_name]) {
			acc[group_name] = {
				a: 0,
				a_total: 0,
				b: 0,
				b_total: 0,
				items: []
			};
		}

		if (item.label_score.includes('Score A')) {
			acc[group_name].a += item.has_score ? item.score : 0;
			acc[group_name].a_total += item.score;
		}

		if (item.label_score.includes('Score B')) {
			acc[group_name].b += item.has_score ? item.score : 0;
			acc[group_name].b_total += item.score;
		}

		acc[group_name].items.push(item);

		return acc;
	}, {});

	const toggleAccordion = index => {
		setIsOpen(prev => ({ ...prev, [index]: !prev[index] }));
	};

	const handleRenderScoreB = (data, item) => {
		let num_matches_in_ref = 0;
		return data
			.filter(x => x.label_score.includes('Score B'))
			.map(element => {
				if (element.belongs_to == item.ref) num_matches_in_ref += 1;
				return (
					element.belongs_to == item.ref && (
						<>
							<div className={`cell small-5 ${num_matches_in_ref > 1 ? 'small-offset-6' : ''}`}>
								<p>{element.label} </p>
							</div>
							<div className="cell small-1 text-right">
								<p className="count red">
									<span className="value">{element.has_score ? element.score : 0}</span>/
									<span className="total">{element.score}</span>
								</p>
							</div>
						</>
					)
				);
			});
	};

	return (
		<div>
			<div className="cell scores">
				<div className="grid-x">
					<div className="cell small-6 green">
						<p>Score A: Grammatische Fähigkeiten</p>
					</div>
					<div className="cell small-6 red">
						<p className="text-right">Score B: Grammatische Symptome</p>
					</div>
				</div>
			</div>

			<div className="cell tabs-panel is-active">
				<ul className="accordion values" data-accordion data-multi-expand="true" data-allow-all-closed="true">
					{Object.entries(groupedScores).map(([group_name, groupData], index) => {
						return (
							<li
								key={group_name}
								className={`accordion-item data-accordion-item${isOpen[index] ? ' is-active' : ''}`}
							>
								<a className="accordion-title" onClick={() => toggleAccordion(index)}>
									<span className="name">{group_name}</span>
									<span className="sums">
										<span className="score_a">
											<span className="value">{groupData.a}</span>/
											<span className="total">{groupData.a_total}</span>
										</span>
										<span className="score_b">
											<span className="value">{groupData.b}</span>/
											<span className="total">{groupData.b_total}</span>
										</span>
									</span>
								</a>

								{isOpen[index] && (
									<div
										className="accordion-content"
										style={{ display: isOpen[index] ? 'block' : 'none' }}
									>
										{groupData.items
											.filter(x => x.label_score.includes('Score A'))
											.map(item => {
												return (
													<>
														<div className="grid-x grid-padding-x grid-padding-y">
															<div className="cell small-5">
																<p>{item.label}</p>
															</div>
															<div
																className="cell small-1 text-right"
																data-ref="{{ item.id }}"
															>
																<p className="count green">
																	<span className="value">
																		{item.has_score ? item.score : 0}
																	</span>
																	/<span className="total">{item.score}</span>
																</p>
															</div>

															{handleRenderScoreB(groupData.items, item)}
														</div>
													</>
												);
											})}
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ScoreComponent;
