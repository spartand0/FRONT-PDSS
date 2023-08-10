import React from 'react';
import { Controller } from 'react-hook-form';
import useSelectMulti from './useSelectMulti';

const PdssSelectMultiComponent = props => {
	// Destructure the props and the state variables from the "useSelectMulti" hook
	const { t, control, errors } = props;
	const {
		isActive,
		handleClick,
		handleSelectLanguage,
		list,
		ref,
		handleChange,
		searchInput,
		filteredLanguages,
		checkedValue
	} = useSelectMulti(props);

	// Render the component
	return !isActive ? (
		<div id="ms-list-1" className="value ms-options-wrap ms-has-selections" onClick={handleClick}>
			<Controller
				control={control}
				name="languages"
				render={({ field }) => (
					<>
						<button
							type="button"
							{...field}
							id="ms-list-1"
							className={errors?.languages?.message ? 'is-invalid-input' : ''}
						>
							{list.length > 0 && <span>{list.substring(0, list.length - 1)}</span>}{' '}
						</button>
						{errors?.languages?.message && (
							<p className="label" style={{ color: 'red' }}>
								{errors?.languages?.message}
							</p>
						)}
					</>
				)}
			/>
		</div>
	) : (
		<div ref={ref} id="ms-list-1" className="value ms-options-wrap ms-has-selections ms-active">
			<button type="button">{list.length > 0 && <span>{list.substring(0, list.length - 1)}</span>}</button>
			<div className="ms-options" style={{ minHeight: '200px', maxHeight: '200px' }}>
				<div className="ms-search">
					<input
						type="search"
						placeholder={t('child_label_search')}
						onChange={handleChange}
						value={searchInput}
					/>
				</div>

				<ul style={{ columnCount: '1', columnGap: '0px', display: isActive ? 'block' : 'none' }}>
					{filteredLanguages &&
						filteredLanguages.map((language, index) => (
							<li key={language.id} className={checkedValue.includes(language.id) ? 'selected' : null}>
								<label>
									<input
										type="checkbox"
										onChange={e => handleSelectLanguage(e, language)}
										value={language.id}
									/>
									{language.name}
								</label>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default PdssSelectMultiComponent;
