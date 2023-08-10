/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment';
import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import { mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';
import { selectSeconds } from '../../../store/reducers/diagnosisExtra.reducer';
import config from '../../../config';

const TherapistTestHeaderComponent = React.memo(props => {
	// Extracting props
	const {
		t,
		data,
		sessionStated,
		updateSession,
		child,
		diagnostic,
		openTestPageViewInNewWindow,
		generateChildDynamicLink,
		handleShowAbort
	} = props;

	// Extracting seconds from Redux store using useSelector hook
	const seconds = useSelector(selectSeconds);

	// Using useMemo to memoize values for better performance
	const diagnosticContentLength = useMemo(() => diagnostic?.diagnostic_content_length, [diagnostic]);
	const currentSlide = useMemo(
		() => diagnostic?.session?.current_slide + (sessionStated ? 1 : 0),
		[diagnostic, sessionStated]
	);
	const processPercent = useMemo(() => Math.trunc(diagnostic?.session?.process_percent), [diagnostic]);

	// Using useCallback to memoize functions for better performance
	const handleSendEmail = useCallback(
		e => {
			e.preventDefault();
			window.location.href = `mailto:?subject=PDSS%20Kindermodus-Link&body=${config.API_Config.APP_BASE_URL+encodeURIComponent(generateChildDynamicLink({
				session: diagnostic?.session.session
			}))}`;
		},
		[diagnostic, generateChildDynamicLink]
	);

	const handleCopyLink = useCallback(
		e => {
			e.preventDefault();
			navigator.clipboard.writeText(
				window.location.origin +
					generateChildDynamicLink({
						session: diagnostic?.session.session
					})
			);
			e.target.childNodes[0].textContent = ' ';
			e.target.childNodes[0].textContent = t(
				'diagnostic_test_mode_therapist_header_dropdown_btn_copy_child_mode_link_done'
			);

			setTimeout(() => {
				e.target.childNodes[0].textContent = t(
					'diagnostic_test_mode_therapist_header_dropdown_btn_copy_child_mode_link'
				);
			}, 1000);
		},
		[diagnostic, generateChildDynamicLink, t]
	);

	// Using useMemo to memoize slides array for better performance
	const slides = useMemo(
		() =>
			data?.map(({ name, instruction, selected_answer,id }, indexDiag) => (
				<li key={id} onClick={() => updateSession('jump_slide', indexDiag)}>
					<a className="go-to-slide clearfix">
						<span className="num">{indexDiag + 1}</span>
						<span className="name">{name || instruction}</span>
						<span className={`status ${selected_answer || ' '}`}>
							<span className="entypo-check"></span>
							<span className="entypo-cancel"></span>
						</span>
					</a>
				</li>
			)),
		[data, updateSession]
	);

	// Rendering the component
	return (
		<div className="header">
			<div className="grid-container">
				<div className="grid-x">
					<div className="cell medium-5 hide-for-small-only">
						<div className="option-links">
							<p className="child-name">
								<span className="entypo-down-open"></span>
								{child?.firstName} {child?.lastName}
							</p>
							<ul>
								<li>
									<Link
										target="_blank"
										to={`${routes.test_pages.navigationPath}${mapCurrentLocationQueriesToJSON}`}
									></Link>
								</li>
								<li>
									<a
										onClick={() =>
											openTestPageViewInNewWindow(
												generateChildDynamicLink({ session: diagnostic?.session.session })
											)
										}
										className="child-link"
									>
										<span className="entypo-forward"></span>
										<span className="text">
											{t('diagnostic_test_mode_therapist_header_dropdown_btn_child_mode_new_tab')}
										</span>
									</a>
								</li>
								<li>
									<a className="send-via-mail" href="#" onClick={handleSendEmail}>
										<span className="entypo-paper-plane"></span>
										<span className="text">
											{t(
												'diagnostic_test_mode_therapist_header_dropdown_btn_send_child_mode_via_mail'
											)}
										</span>
									</a>
								</li>
								<li>
									<a onClick={handleCopyLink} className="link-copy">
										<span className="entypo-clipboard"></span>
										<span className="text">
											{t(
												'diagnostic_test_mode_therapist_header_dropdown_btn_copy_child_mode_link'
											)}
										</span>
									</a>
								</li>
								<li>
									<a className="cancel-test" onClick={handleShowAbort}>
										<span className="entypo-cancel-squared"></span>
										<span className="text">
											{t('diagnostic_test_mode_therapist_header_dropdown_btn_test_cancel')}
										</span>
									</a>
									<Link className="close-test" onClick={() => window.close()}>
										<span className="entypo-cancel-squared"></span>
										<span className="text">
											{t('diagnostic_test_mode_therapist_header_dropdown_btn_label_close_window')}
										</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="cell medium-2 small-4 text-center small-only-text-left">
						<p className="test-name">{diagnostic?.title}</p>
					</div>
					<div className="cell medium-5 small-8">
						<ul className="status clearfix text-right">
							<li className="slides">
								<p className="clearfix">
									<span className="entypo-archive"></span>
									<span className="current">{currentSlide}</span>
									<span className="separator">/</span>
									<span className="total">{diagnosticContentLength}</span>
								</p>
								<div className="overview">
									<ul>{slides}</ul>
								</div>
							</li>
							{diagnostic?.session && (
								<li className="process">
									<p className="percent">{processPercent}%</p>
									<div className="bg">
										<span
											className="bar"
											style={{ width: `${diagnostic?.session?.process_percent}%` }}
										></span>
									</div>
								</li>
							)}
							<li className="time">
								<p>
									<span className="entypo-clock"></span>
									<span className="value">
										{moment.utc(seconds ? seconds * 1000 : 0).format('HH:mm:ss')}
									</span>
								</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="grid-x process-for-child">
					<div className="cell">
						<div className="bg">
							<span className="bar" style={{ width: '10%' }}></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default TherapistTestHeaderComponent;
