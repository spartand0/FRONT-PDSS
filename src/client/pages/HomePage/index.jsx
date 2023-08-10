import React from 'react';
import HomePageSliderComponent from '../../components/HomePageSliderComponent';
import CardsHomeContainer from '../../containers/CardsHomeContainer';
import BookHomeContainer from '../../containers/BookHomeContainer';
import { TestimonialsHomeContainer } from '../../containers/TestimonialsHomeContainer';

const HomePage = ({ t }) => {

	return (
		<section>
			<HomePageSliderComponent t={t} />
			<CardsHomeContainer t={t} />
			<TestimonialsHomeContainer t={t}/>
			<BookHomeContainer t={t} />
		</section>
	);
}

export default HomePage;
