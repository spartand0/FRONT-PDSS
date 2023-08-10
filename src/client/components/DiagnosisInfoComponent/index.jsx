import React, { useEffect, useRef, useState } from 'react';
import { progressRing } from '../../../shared/helpers/properties';
import DiagnosisInfoGalleryComponent from '../DiagnosisInfoGalleryComponent';
import useDiagnosisInfo from './useDiagnosisInfo';

function DiagnosisInfoComponent(props) {
	const { handleCloseInformation, info } = props;
	const images = info?.images.split(',');
	const { handleShowGallery, showGallery, dataParserForInformationTabs,setShowGallery } = useDiagnosisInfo();
	const [title, setTitle] = useState([]);
	const [content, setContent] = useState([]);
	const [selectedTab, setSelectedTab] = useState(0);
	let percent = Math.round((info.duration_in_min / 60) * 100) || 0;
	const { strokeDasharray, strokeDashoffset } = progressRing(percent, 10);

	useEffect(() => {
		const data = dataParserForInformationTabs(info.description);
		setTitle(data.tabsTitle);
		setContent(data.tabsContent);
	}, [info.description]);

	const handleSelectedTab = data => event => {
		setSelectedTab(data);
	};
	return (
		<>
			<div className="reveal-overlay" style={{ display: 'block' }}>
				<dialog open className="show-popup-info" id="modal-test">
					<h3>{info && info.title}</h3>
					<div className="grid-x grid-padding-x grid-padding-y">
						<div className="cell small-4">
							<aside>
								<div className="duration">
									<span className="progress-ring">
										<svg>
											<circle
												r="10"
												cx="20"
												cy="20"
												strokeDasharray={strokeDasharray}
												strokeDashoffset={strokeDashoffset}
											/>
										</svg>
									</span>
									<span className="text">
										<span className="label">Dauer ca.</span>
										<span className="time">{info && info.duration_in_min} Minuten</span>
									</span>
								</div>

								<div className="short-info" dangerouslySetInnerHTML={{ __html: info.aside_text }}></div>
							</aside>
						</div>
						<div className="cell small-8">
							<ul className="images clearfix">
								{info &&
									images &&
									images.map((image, index) => {
										return (
											<li key={image}>
												<a
													onClick={() => handleShowGallery(image)}
													className="fancybox"
													data-fancybox="gallery"
													style={{
														backgroundImage: `url(${window.location.origin}/${image})`
													}}
												></a>
											</li>
										);
									})}
							</ul>
							<div className="description">
								<ul className="tabs">
									<li className="tabs-title" onClick={handleSelectedTab(0)}>
										<a aria-selected={`${selectedTab === 0 && true }`}>{title[0]}</a>
									</li>
									<li className="tabs-title" onClick={handleSelectedTab(1)}>
										<a aria-selected={`${selectedTab === 1 && true}`}>{title[1]}</a>
									</li>
									<li className="tabs-title " onClick={handleSelectedTab(2)}>
										<a aria-selected={`${selectedTab === 2 && true }`}>{title[2]}</a>
									</li>
								</ul>
								<div className="tabs-content">
									<div className={`tabs-panel  ${selectedTab === 0 && 'is-active'}`}>
										<div dangerouslySetInnerHTML={{ __html: content[0] }}></div>
									</div>
									<div className={`tabs-panel  ${selectedTab === 1 && 'is-active'}`}>
										<div dangerouslySetInnerHTML={{ __html: content[1] }}></div>
									</div>
									<div className={`tabs-panel ${selectedTab === 2 && 'is-active'}`}>
										<div dangerouslySetInnerHTML={{ __html: content[2] }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button
						className="close-button"
						onClick={handleCloseInformation}
						aria-label="Popup schließen"
						type="button"
					>
						<span className="entypo-cancel-squared"></span>
					</button>
				</dialog>
			</div>
			{showGallery.show && (
				<DiagnosisInfoGalleryComponent
					showGallery={showGallery}
					handleShowGallery={handleShowGallery}
					images={images}
					setShowGallery={setShowGallery}
				/>
			)}
		</>
	);
}

export default DiagnosisInfoComponent;
