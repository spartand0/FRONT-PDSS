import React, { useMemo } from 'react';

const MainBreadCrumb = ({ t, currentRouter }) => {
	// Memoize the pathNames array using useMemo.
	const pathNames = useMemo(
		() => currentRouter.location.pathname.split('/').filter(x => x),
		[currentRouter.location.pathname]
	);

	// Render the component if the current location is not the dashboard.
	if (currentRouter.location.pathname !== '/dashboard' && currentRouter.location.pathname !== '/dashboard/') {
		return (
			<div className="breadcrumb">
				<div className="grid-container">
					<div>
						<p>{t('location')}</p>
						<ul>
							<li key={-1}>
								<a href="/">{t('home')}</a>
							</li>
							{/* Map over the pathNames array and generate breadcrumbs for each item. */}
							{pathNames.map((name, index) => {
								const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
								return currentRouter.location.pathname === routeTo ? (
									<li key={name}>{t(name)}</li>
								) : (
									<li key={name}>
										<a href={routeTo}>{t(name)}</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}

	// If the current location is the dashboard, don't render anything.
	return null;
};

export default MainBreadCrumb;
