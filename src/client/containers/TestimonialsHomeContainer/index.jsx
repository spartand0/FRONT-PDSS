import React, { useEffect, useState } from 'react';
import HomeTestimonialsSliderComponent from '../../components/HomeTestimonialsSliderComponent';
import OnKeyPressComponent from '../../components/KeyPressComponent';

export const TestimonialsHomeContainer = ({ t }) => {
    const testimonials = [
        {
            text: t('testimonial_julia'),
            author: "Julia Siegmüller",
            image: "valutation_siegmueller.jpg"
        },
        {
            text: t('testimonial_christina'),
            author: "Christina Kauschke",
            image: "valutation_kauschke.jpg"
        },
        {
            text: t('testimonial_steffi'),
            author: "Steffi Sachse",
            image: "valutation_sachse.jpg"
        },
        {
            text: t('testimonial_tobias'),
            author: "Tobias Dörfler",
            image: "valutation_doerfler.jpg"
        },
        {
            text: t('testimonial_anne'),
            author: "Anne Tenhagen",
            image: "valutation_tenhagen.jpg"
        }
    ];
    const [current, setCurrent] = useState(0);
    const length = testimonials.length;
    const [mousedOver, setMousedOver] = useState(false);
    const nextSlide = () => {
		   setCurrent(current === length - 1 ? 0 : current + 1)
	};

	const prevSlide = () => {
		   setCurrent(current === 0 ? length - 1 : current - 1);
	};

    useEffect(() => {
        if (!mousedOver) {
            const timer = setInterval(() => {
                setCurrent((prevCount) => (prevCount + 1) % length);
            }, 6000);
            return () => clearInterval(timer);
        }
    }, [mousedOver, length]);

    return (
        <OnKeyPressComponent next={nextSlide} previous={prevSlide}>
            <div className="orbit valutations">
                <div className="grid-container text-center">
                    <h2>{t('testimonials_title')}</h2>
                </div>
                <div className="orbit-wrapper">
                    <div className='carousel'
                        onMouseOver={() => setMousedOver(true)}
                        onMouseOut={() => setMousedOver(false)}
                    >
                        <div className="carousel-inner" style={{ transform: `translateX(${-current * 100}%)` }}>
                            {testimonials.map((testimonial, index) => (
                                <li className="carousel-item" key={testimonial.author}>
                                    <HomeTestimonialsSliderComponent testimonial={testimonial} />
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid-container">
                    <div className="orbit-bullets">
                        {testimonials.map((testimonial, index) =>
                            (<button className={(current === index ? ' is-active' : '')} key={testimonial.author} onClick={() => setCurrent(index)}></button>)
                        )}
                    </div>
                </div>
            </div>
        </OnKeyPressComponent>
    );
};
