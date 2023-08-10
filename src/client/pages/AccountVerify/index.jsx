import React from 'react';
import ContainerHeaderLayout from '../../layouts/ContainerHeaderLayout';
import DefaultLayout from '../../layouts/DefaultLayout';

export default function AccountVerify({ t }) {
	return (
		<DefaultLayout>
			<ContainerHeaderLayout hideWhiteBox>
				<div className="box text-center">
					<div className="padding">
						<p>{t('unauthorized_account_msg')}</p>
					</div>
				</div>
			</ContainerHeaderLayout>
		</DefaultLayout>
	);
}
