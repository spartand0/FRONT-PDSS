/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';
import routes from '../../../config/routes';
import AuthService from '../../../security/services/AuthService';
import OnKeyPressComponent from '../KeyPressComponent';

// Preload the slide images to reduce loading time when they are displayed
const slideImages = [
	`${process.env.REACT_APP_S3_ENDPOINT}/files/images/landingpage/iStockELS-845915488_with_screeen_and_domain.jpg`,
	`${process.env.REACT_APP_S3_ENDPOINT}/files/images/landingpage/iStockELS-1340561086_with_screen.jpg`,
	`${process.env.REACT_APP_S3_ENDPOINT}/files/images/landingpage/AdobeStockELS_352150617_with_screen.jpg`
];

// Determine if the user is logged in
const isLoggedIn = AuthService.isLoggedIn();

function HomePageSliderComponent({ t }) {
	const [current, setCurrent] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);

	// Start the slideshow if it's not currently playing and the user isn't moused over
	useEffect(() => {
		if (isPlaying) {
			const interval = setInterval(() => {
				setCurrent(current => (current + 1) % slideImages.length);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [isPlaying, current]);

	// Handle the next and previous slide buttons
	const nextSlide = () => {
		setCurrent(current => (current + 1) % slideImages.length);
	};

	const prevSlide = () => {
		setCurrent(current => (current - 1 + slideImages.length) % slideImages.length);
	};

	// Handle mouse events to pause and resume the slideshow
	const handleMouseEnter = () => {
		setIsPlaying(false);
	};

	const handleMouseLeave = () => {
		setIsPlaying(true);
	};

	return (
		<OnKeyPressComponent next={nextSlide} previous={prevSlide}>
			<div className="orbit landing" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<div className="orbit-wrapper">
					<div className="orbit-controls">
						<button className="orbit-previous" onClick={prevSlide}>
							<span className="entypo entypo-left-open-big" />
						</button>
						<button className="orbit-next" onClick={nextSlide}>
							<span className="entypo entypo-right-open-big" />
						</button>
					</div>
					<div className="carousel">
						<div className="carousel-inner" style={{ transform: `translateX(${-current * 100}%)` }}>
							{slideImages.map((slideImage, index) => (
								<div className="carousel-item" key={slideImage}>
									<li className="orbit-slide" style={{ backgroundImage: `url(${slideImage})` }} />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="text">
					<div className="grid-container">
						<div className="grid-x grid-margin-x">
							<div className="cell medium-8">
								<div className="box">
									<div className="padding text-center">
										<h2> {t('slider_card_title')} </h2>
										<p> {t('slider_card_body')} </p>
										<p>
											<a
												className="button"
												href={config.API_Config.shop_url}
												target="_blank"
												rel="noreferrer"
											>
												{t('buy_now')}
											</a>
											{!isLoggedIn && (
												<a className="button" href={routes.securities_pages.login.path}>
													{t('register')}
												</a>
											)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid-container">
					<nav className="orbit-bullets">
						{slideImages.map((slideImage, index) => (
							<button
								className={current === index ? 'is-active' : ''}
								key={slideImage}
								onClick={() => setCurrent(index)}
							/>
						))}
					</nav>
				</div>
			</div>
		</OnKeyPressComponent>
	);
}

HomePageSliderComponent.propTypes = {
	t: PropTypes.func.isRequired
};

export default HomePageSliderComponent;
