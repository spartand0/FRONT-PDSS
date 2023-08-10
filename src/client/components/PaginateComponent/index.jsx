import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChildList, selectCurrentPage, setCurrentPage } from '../../../store/reducers/user.reducer';

function PaginateComponent() {
	const dispatch = useDispatch();
	const childList = useSelector(selectChildList);
	const currentPage = useSelector(selectCurrentPage);
	const [prevNextStatus, setPrevNextStatus] = useState({
		nextDisabled: false,
		prevDisabled: false
	});
	const pages = Math.ceil(childList.total / childList.limit);
	const start_page = 1;
	const limit = pages;
	const handleChangeCurrentPage = data => event => {
		event.preventDefault();
		dispatch(setCurrentPage(data));
	};
	useEffect(() => {
		if (currentPage > 1) {
			setPrevNextStatus({ prevDisabled: false, nextDisabled: false });
			if (currentPage != pages) {
				setPrevNextStatus({ prevDisabled: false, nextDisabled: false });
			}
			if (currentPage === pages) {
				setPrevNextStatus({ prevDisabled: false, nextDisabled: true });
			}
		}
		if (currentPage === 1) {
			setPrevNextStatus({ prevDisabled: true, nextDisabled: false });
		}
	}, [currentPage]);

	return childList.total > childList.limit ? (
		<div className="grid-x">
			<div className="cell">
				<ul className="paging">
					{!prevNextStatus.prevDisabled && childList.page !== 1 && (
						<li>
							<a className="prev" onClick={handleChangeCurrentPage(currentPage - 1)}>
								<span className="entypo-left-open"></span>
							</a>
						</li>
					)}
					{Array(limit - start_page + 1)
						.fill()
						.map((_, idx) => start_page + idx)
						.map(page => {
							return (
								<li key={page}>
									<a
										className={page == childList.page ? 'active' : ''}
										onClick={handleChangeCurrentPage(page)}
									>
										{page}
									</a>
								</li>
							);
						})}
					{!prevNextStatus.nextDisabled && childList.page !== pages && (
						<li>
							<a className="next" onClick={handleChangeCurrentPage(currentPage + 1)}>
								<span className="entypo-right-open"></span>
							</a>
						</li>
					)}
				</ul>
			</div>
		</div>
	) : null;
}

export default PaginateComponent;
