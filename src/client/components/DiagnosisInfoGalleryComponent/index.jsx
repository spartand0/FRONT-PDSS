import React, { useState, useEffect, useRef } from 'react';
import OnKeyPressComponent from '../KeyPressComponent';

function DiagnosisInfoGalleryComponent(props) {
	const { handleShowGallery, showGallery, images, setShowGallery } = props;
	const [current, setCurrent] = useState(images.indexOf(showGallery.image));
	const [showToolbar, setShowToolbar] = useState(true);
	const [oneMouseMove, setOneMouseMove] = useState(false);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [prevDisabled, setPrevDisabled] = useState(false);
	const length = images.length;
	const [scale, setScale] = useState(3);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const handleImageClick = event => {
		const { offsetX, offsetY } = event.nativeEvent;
		if (scale === 1) {
			setScale(3);
			setPosition({
				x: -(offsetX * 2),
				y: -(offsetY * 2)
			});
		} else {
			setScale(1);
			setPosition({ x: 0, y: 0 });
		}
	};
	const handleDoubleClick = () => {
		setScale(1);
		setPosition({ x: 0, y: 0 });
	};
	const handleMouseDown = event => {
		setIsDragging(true);
		const { clientX, clientY } = event;
		const startX = clientX - position.x;
		const startY = clientY - position.y;
		const handleMouseMove = event => {
			let newX = event.clientX - startX;
			let newY = event.clientY - startY;
			setPosition({
				x: newX,
				y: newY
			});
		};
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', handleMouseMove);
			setIsDragging(false);
		});
	};

	const nextSlide = () => {
		if (!nextDisabled) {
			setCurrent(current === length - 1 ? 0 : current + 1);
		}
	};

	const prevSlide = () => {
		if (!prevDisabled) {
			setCurrent(current === 0 ? length - 1 : current - 1);
		}
	};
	useEffect(() => {
		setScale(1);
		setPosition({ x: 0, y: 0 });
		setNextDisabled(current === length - 1 ? true : false);
		setPrevDisabled(current === 0 ? true : false);
	}, [current, length]);

	setTimeout(() => {
		setShowToolbar(false);
		setOneMouseMove(false);
	}, 6000);

	const onFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.getElementById('fancybox-container-1')?.requestFullscreen();
		}
	};

	const onMouseMoveInWindow = event => {
		event.preventDefault();
		setShowToolbar(true);
	};

	useEffect(() => {
		if (!oneMouseMove) {
			window.addEventListener('mousemove', onMouseMoveInWindow);
			setOneMouseMove(true);
		} else {
			window.removeEventListener('mousemove', onMouseMoveInWindow);
		}
	}, []);

	const useOutsideWrapper = ref => {
		useEffect(() => {
			function handleClickOutside(event) {
				if (
					ref.current &&
					!ref.current.contains(event.target) &&
					event.target.id !== 'fancy-close' &&
					event.target.id !== 'fancy-fullScreen' &&
					event.target.id !== 'fancy-next' &&
					event.target.id !== 'fancy-previous'
				) {
					setShowGallery(prev => ({
						show: !prev.show,
						image: ''
					}));
				}
			}
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	};

	const wrapperRef = useRef(null);
	useOutsideWrapper(wrapperRef);

	return (
		<OnKeyPressComponent next={nextSlide} previous={prevSlide}>
			<div
				className={`fancybox-container fancybox-is-open fancybox-is-zoomable fancybox-can-zoomIn ${
					showToolbar ? ' fancybox-show-toolbar fancybox-show-nav' : ''
				}`}
				id="fancybox-container-1"
			>
				<div className="fancybox-bg"></div>
				<div className="fancybox-inner">
					<div className="fancybox-toolbar">
						<button
							className="fancybox-button fancybox-button--fullscreen"
							onClick={onFullScreen}
							title="Full screen"
							id="fancy-fullScreen"
						></button>
						<button
							className="fancybox-button fancybox-button--close"
							title="Close"
							onClick={handleShowGallery}
							id="fancy-close"
						></button>
					</div>
					{length && length > 1 && (
						<div className="fancybox-navigation">
							<button
								title="Previous"
								className="fancybox-arrow fancybox-arrow--left"
								onClick={prevSlide}
								disabled={prevDisabled}
								id="fancy-previous"
							/>
							<button
								title="Next"
								className="fancybox-arrow fancybox-arrow--right"
								onClick={nextSlide}
								disabled={nextDisabled}
								id="fancy-next"
							/>
						</div>
					)}
					<div className="fancybox-stage">
						<div
							className="fancybox-slide fancybox-slide--image fancybox-slide--current fancybox-slide--complete"
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<div
								className="fancybox-image-wrap"
								style={{
									position: 'relative',
									width: 'auto',
									height: `80%`,
									aspectRatio: '1.42/1',
									transition: '.1s'
								}}
								ref={wrapperRef}
							>
								<img
									src={`${window.location.origin}/${images[current]}`}
									alt="Zoomable"
									className="fancybox-image"
									style={{
										position: 'absolute',
										top: `${position.y}px`,
										left: `${position.x}px`,
										transform: `scale(${scale})`,
										transformOrigin: 'top left',
										cursor: scale === 1 ? 'zoom-in' : 'grab',
										objectFit: 'contain',
										transition: 'transform .1s'
									}}
									onClick={event => {
										if (!isDragging && scale === 1) {
											handleImageClick(event);
										}
									}}
									onDoubleClick={handleDoubleClick}
									onMouseDown={handleMouseDown}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</OnKeyPressComponent>
	);
}

export default DiagnosisInfoGalleryComponent;
