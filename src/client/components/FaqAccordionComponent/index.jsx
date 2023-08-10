import { useState } from 'react';
import AccordionItem from './AccordionItem';

// Component that renders a list of accordion items
const Accordion = ({ faqs }) => {
	// Set the initial active index to -1 (no active items)
	const [activeIndex, setActiveIndex] = useState(-1);

	// Toggle the active index on click
	const handleToggle = index => {
		setActiveIndex(prevIndex => (prevIndex === index ? -1 : index));
	};

	return (
		<ul className="accordion">
			{/* Loop through the faqs and render an AccordionItem for each */}
			{faqs.map((faq, index) => (
				<AccordionItem
					key={faq.question}
					faq={faq}
					active={activeIndex === index}
					onToggle={() => handleToggle(index)}
				/>
			))}
		</ul>
	);
};

export default Accordion;
