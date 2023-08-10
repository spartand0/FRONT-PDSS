import { useRef } from 'react';

const AccordionItem = ({ faq, active, onToggle }) => {
	// Destructure the `faq` prop to get the `question` and `answer`
	const { question, answer } = faq;

	// Create a ref for the content element
	const contentEl = useRef();

	// Render the AccordionItem component
	return (
		<li className={`accordion_item ${active ? 'active' : ''}`}>
			{/* Render a button for the question with a control icon */}
			<button className="button" onClick={onToggle}>
				{question}
				<span className="control">{active ? '—' : '+'} </span>
			</button>
			{/* Render a div for the answer with a dynamic height */}
			<div
				ref={contentEl} // Set the ref to the content element
				className="answer_wrapper"
				style={active ? { height: contentEl.current.scrollHeight } : { height: '0px' }}
			>
				{/* Render the answer */}
				<div className="answer">{answer}</div>
			</div>
		</li>
	);
};

export default AccordionItem;
