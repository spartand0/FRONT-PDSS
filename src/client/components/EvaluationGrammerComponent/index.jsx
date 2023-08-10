/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AnswersComponent from './answers';
import ScoreComponent from './scoreComponent';
import DiagnosticAnalysisComponent from './DiagnosticAnalysisComponent';
import { useDispatch, useSelector } from 'react-redux';
import { action_evaluation_getGrammarNotes, action_evaluation_getGrammars, action_evaluation_setGrammarNotes } from '../../../store/actions';
import { selectAnalysisResult, selectGrammarNotes, selectGrammars } from '../../../store/reducers/evaluation.reducers';

const GrammarComponent = ({ t, scores }) => {
	const [grammar, setGrammer] = useState([]);
	const [checks, setChecks] = useState([]);
	const [indexGrammer, setIndex] = useState(0);
	const [selectionCount, setSelected] = useState(0);
	const handlePrevious = () => {
		getGrammer();
		if (indexGrammer > 0) setIndex(indexGrammer - 1);
	};
	const sessionInfo = useSelector(selectAnalysisResult);
	const dispatch = useDispatch();

	const grammarResult = useSelector(selectGrammars);
	const grammarNotes = useSelector(selectGrammarNotes);

	useEffect(() => {
		if (grammarResult) {
			setGrammer(grammarResult?.items);
			setChecks(grammarResult?.scores.groups);
		}
	}, [grammarResult]);
	const handleMaxSelectReached = () => {
		if (indexGrammer < grammar.length - 1) {
			setIndex(indexGrammer + 1);
		}
	};

	const handleSelectionChange = selectionCount => {
		setSelected(selectionCount);
	};

	const handleNext = () => {
		getGrammer();
		if (indexGrammer < grammar?.length - 1) setIndex(indexGrammer + 1);
	};
	const getGrammer = () => {
		dispatch(
			action_evaluation_getGrammars({
				session: sessionInfo.diagnostic_session?.session,
				childAgeInMonths: sessionInfo.diagnostic_session?.child_age_in_months
			})
		);
		dispatch(
			action_evaluation_getGrammarNotes(
				sessionInfo.diagnostic_session?.session
			)
		);
	};
	useEffect(() => {
		getGrammer();
	}, []);

	const storeGrammarNotes = (e) => {
		grammarNotes[0]?.value != e.target.value &&
			dispatch(
				action_evaluation_setGrammarNotes({
					session: sessionInfo.diagnostic_session?.session,
					value: e.target.value,
					name: 'grammar_notes'
				})
			).then(() => {
				dispatch(
					action_evaluation_getGrammarNotes(sessionInfo.diagnostic_session?.session)
				);
			});
	}
	return (
		<div className="tabs-panel is-active" id="grammar">
			<div className="cell headline">
				<p>
					<strong>Scoreermittlung</strong>
				</p>
				<div className="callout primary">
					<p>
						Für eine detaillierte Auswertung werden die Antworten des Kindes nach dem Vorkommen bestimmter
						Strukturen durchsucht. Gehen Sie daher wie folgt vor:
					</p>
					<ol>
						<li>Ihnen wird die Liste der Äußerungen des Kindes angezeigt.</li>
						<li>Oberhalb der Liste sehen Sie, welche Struktur gesucht wird.</li>
						<li>Wenn Sie eine Äußerung mit der gesuchten Struktur finden, klicken Sie diese an.</li>
						<li>
							Wurde die jeweils geforderte Anzahl an Belegen angeklickt, geht es weiter zur nächsten
							Struktur.
						</li>
						<li>
							Falls Sie weniger als die notwendige Anzahl an Belegen finden, klicken Sie auf „Weiter“.
						</li>
					</ol>
				</div>
			</div>
			<div className="cell tabs-panel is-active">
				<div className="cell orbit grammar">
					<div className="cell tabs-panel is-active">
						<div className="orbit-controls">
							<button className="button orbit-previous" onClick={handlePrevious}>
								<span className="entypo-left-open"></span> Zurück
							</button>
							<button className="button orbit-next" onClick={handleNext}>
								Weiter <span className="entypo-right-open"></span>
							</button>
						</div>

						<ul className="orbit">
							<div className="cell  small-11">
								<p className="search-for">
									<strong>{grammar[indexGrammer]?.label_structure}</strong>
								</p>
								<p className="instruction">{grammar[indexGrammer]?.instruction}</p>
							</div>
							<div className="cell small-1 orbit">
								<p className="matches">
									<span className="found">{selectionCount}</span>/
									<span className="min">{grammar[indexGrammer]?.min_occur}</span>
								</p>
							</div>
							<div className="cell classification ">
								<label>Liste aller Antworten</label>
								<div className="legend">
									<p>
										<span className="green"></span>Vollständig{' '}
									</p>
									<p>
										<span className="red"></span>Unvollständig{' '}
									</p>
									<p>
										<span className="grey"></span>Elipse{' '}
									</p>
								</div>
								<div className="answers ">
									<ul>
										<AnswersComponent
											t={t}
											selectionCount={selectionCount}
											grammar={grammar[indexGrammer]}
											session={sessionInfo.diagnostic_session?.session}
											maxSelect={grammar[indexGrammer]?.min_occur}
											onSelectionChange={handleSelectionChange}
											answers={scores.filter(answer => answer.type === 'answers')}
											selected_answers={scores.values}
											onMaxSelectReached={handleMaxSelectReached}
											checks={checks}
										/>
									</ul>
								</div>
							</div>
						</ul>
					</div>
				</div>
			</div>
			<div className="cell">
				<div className="grid-x">
					<div className="cell small-6 process">
						<p className="percent">{Math.round(((indexGrammer + 1) / grammar.length) * 100)}%</p>
						<div className="bg">
							<span
								className="bar"
								style={{ width: `${Math.round(((indexGrammer + 1) / grammar.length) * 100)}%` }}
							></span>
						</div>
					</div>
					<div className="cell small-6 slides">
						<p className="text-right">
							<span className="entypo-archive"></span>
							<span className="current">{indexGrammer + 1}</span>
							<span className="separator">/</span>
							<span className="total">{grammar.length}</span>
						</p>
					</div>
				</div>
			</div>
			<ScoreComponent grammar_scores={grammar} grammar={checks} />
			<div className="cell">
				<textarea placeholder="Weitere Beobachtungen/Auffälligkeiten" onBlur={storeGrammarNotes} defaultValue={grammarNotes[0]?.value || ''} id="grammar_notes"></textarea>
			</div>
			<div className="cell tabs-panel is-active" id="evaluation">
				<DiagnosticAnalysisComponent diagnostic_analysis={scores} />
			</div>
		</div>
	);
};

export default GrammarComponent;
