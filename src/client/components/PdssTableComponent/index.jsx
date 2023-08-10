import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import routes from '../../../config/routes';
import { CryptoProviders, getItemsFromCookies } from '../../../shared/helpers/properties';
import { selectSearchStatus, selectSearchText } from '../../../store/reducers/diagnosis.reducer';
import PdssConfirmPopup from '../PdssConfirmPopupComponent';
import PdssTableCellComponent from '../PdssTableCell';
import PdssTableHeaderComponent from '../PdssTableHeaderComponent';

const PdssTableComponent = props => {
	const { data, t, headers, handleDelete, handleCancel, handleConfirm, showDeletePopup } = props;
	const searchText = useSelector(selectSearchText);
	const searchStatus = useSelector(selectSearchStatus);

	const handleResume = diagnosisSession => event => {
		event.preventDefault();
		window.open(
			`${routes.test_pages.navigationPath}?id=${diagnosisSession.diagnostic}&child=${
				diagnosisSession.child
			}&token=${CryptoProviders(
				JSON.stringify({
					child: diagnosisSession.child,
					diagnosticId: diagnosisSession.diagnostic,
					diagnosisTitle: diagnosisSession.title,
					CFToken: getItemsFromCookies('token')
				})
			).hashIt()}&session=${diagnosisSession.session}`,
			'_blank',
			'toolbar=0,location=0,menubar=0'
		);
	};


	return (
		<>
			{useMemo(() => {
				return (
					<div className="tests">
						<div>
							<ul>
								<li className="headline" key="headline">
									{headers.map(element => {
										return <PdssTableHeaderComponent key={element.id} header={element} t={t} />;
									})}
								</li>
								{data && data.length ? (
									data.map(row => {
										return (
											<li key={row.id}>
												{headers.map(header => {
													return (
														<PdssTableCellComponent
															t={t}
															data={row}
															header={header}
															key={header.id}
															searchText={searchText}
															searchStatus={searchStatus}
															handleResume={handleResume}
															handleDelete={handleDelete}
														/>
													);
												})}
											</li>
										);
									})
								) : (
									<li>
										<p>{t('diagnosis_Expand_label_no_tests')}</p>
									</li>
								)}
							</ul>
						</div>
					</div>
				);
			})}
			<PdssConfirmPopup
				ConfirmPopup={handleConfirm}
				closePopup={handleCancel}
				title={t('diagnosis_session_confirm_delete_title')}
				description={t('diagnosis_session_confirm_delete')}
				show={showDeletePopup.show}
			/>
		</>
	);
};

export default memo(PdssTableComponent);
