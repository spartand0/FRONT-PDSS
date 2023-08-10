import React from 'react';
import ContainerHeaderLayout from '../../layouts/ContainerHeaderLayout';
import DefaultLayout from '../../layouts/DefaultLayout';

export default function NotFoundPage({ t }) {
	return (
		<DefaultLayout>
			<ContainerHeaderLayout hideWhiteBox title={t('page_notfound_content_title')}>
				<div className="box text-center">
					<div className="padding">
						<p>{t('page_notfound_content_text')}</p>
					</div>
				</div>
			</ContainerHeaderLayout>
		</DefaultLayout>
	);
}
