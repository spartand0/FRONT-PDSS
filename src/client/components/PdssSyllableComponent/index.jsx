import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
const PdssSyllableComponent = props => {
	const { ContextExtendedResult } = props;
	const { setElements, elements, handleExpandKeyboard, expandKeyboard, selected, setUpdate } =
		useContext(ContextExtendedResult);

	const handleRemoveWordFromString = (removedWord, word) => {
		let regex = new RegExp('\\b' + removedWord + '\\b', 'g');
		return word.replace(regex, '');
	};

	const handleAddLetterLeft = (key, index, letter) => event => {
		event.stopPropagation();
		let char = {elementKey: uuidv4(), letter: '', hasClass: 'letter added', type: 'added', replacement: '' };
		elements[key].letters.splice(index, 0, char);
		setElements([...elements]);
		setUpdate(true);
	};

	const handleAddLetterRight = (key, index, letter) => event => {
		event.stopPropagation();
		let char = { elementKey: uuidv4(),letter: '', hasClass: 'letter added', type: 'added', replacement: '' };
		elements[key].letters.splice(index + 1, 0, char);
		setElements([...elements]);
		setUpdate(true);
	};

	const handleRemoveSyllable = key => event => {
		event.stopPropagation();
		if (elements[key].hasClass.includes('removed')) {
			elements[key].hasClass = handleRemoveWordFromString('removed', elements[key].hasClass);
		} else {
			elements[key].hasClass += ' removed';
		}
		setElements([...elements]);
		setUpdate(true);
	};

	const handleBackSpacePress = ( elements, key, index) => event=> {
		if (event.keyCode === 8) {
			// add conditions for api calls performance in case we have multiple backspace press
			if (event.target.innerText !== '') {
				event.target.innerText = '';
				elements[key].letters[index].replacement = '';
				if (!elements[key].letters[index].hasClass.includes('replaced'))
					elements[key].letters[index].hasClass = elements[key].letters[index].hasClass + ' replaced';
				setElements([...elements]);
				return;
			}
			// resolve case if span doesn't have content, add class replaced to span
			else if (event.target.innerText === '' && !elements[key].letters[index].hasClass.includes('replaced')) {
				elements[key].letters[index].hasClass = elements[key].letters[index].hasClass + ' replaced';
				setElements([...elements]);
				return;
			}
		}
	};
	const handleOnKeyUp = (key, index) => event => {
		// on backspace key pressed remove added char
		handleBackSpacePress(elements, key, index);
		// if current char is not the same as original char
		if (event.target.innerText !== elements[key].letters[index].letter) {
			if (elements[key].letters[index].replacement !== event.target.innerText) {
				elements[key].letters[index].replacement = event.target.innerText;
				if (!elements[key].letters[index].hasClass.includes('replaced'))
					elements[key].letters[index].hasClass = elements[key].letters[index].hasClass + ' replaced';
				setElements([...elements]);
			}
		}
		// add char to added span left and right
		if (
			elements[key].letters[index].hasClass.includes('added') &&
			event.target.innerText !== elements[key].letters[index].replacement
		) {
			elements[key].letters[index].replacement = event.target.innerText;
			setElements([...elements]);
		}
		// if current char is the same as original char remove replaced class
		if (
			event.target.innerText === elements[key].letters[index].letter &&
			elements[key].letters[index].hasClass.includes('replaced')
		) {
			elements[key].letters[index].hasClass = handleRemoveWordFromString(
				'replaced',
				elements[key].letters[index].hasClass
			);
			setElements([...elements]);
		}
	};

	const handleOnKeyDown = (key, index) => event => {
		// deleting added span if key code is backspace
		if (event.keyCode === 8) {
			if (elements[key].letters[index].hasClass.includes('added') && event.target.innerText.length === 0) {
				delete elements[key].letters[index];
				setElements([...elements]);
			}
		}
		// for every key press except 39 and 37 keyCode (left and right arrow)
		if (event.keyCode != 39 && event.keyCode != 37 && event.key.length === 1) {
			// respect same logic as np can't change char without deleting prev value
			if (elements[key].letters[index].replacement !== '') {
				event.preventDefault();
				return;
			}
			// accept only one char written in span
			if (event.target.innerText.length === 1) {
				event.preventDefault();
				return;
			}
		}
	};
	
	return (
		<>
			{elements?.map((element, key) => {
				return (
					<span
						className={element.hasClass}
						key={element.elementKey}
						data-json={element.dataJson && btoa(encodeURIComponent(JSON.stringify(element?.dataJson)))}
					>
						{element.letters.map((char, index) => {
							return (
								<span
									className={`${char.hasClass} ${
										expandKeyboard && selected.index === index && selected.key === key
											? ' active'
											: ''
									}   `}
									key={char.elementKey}
								>
									{!char.hasClass.includes('locked') && (
										<span
											className="add-letter left"
											onClick={handleAddLetterLeft(key, index, char.letter)}
										>
											<span className="entypo-plus"></span>
										</span>
									)}
									<span
										className="l"
										contentEditable={!char.hasClass.includes('locked') ? true : false}
										onKeyDown={handleOnKeyDown(key, index)}
										onKeyUp={!char.hasClass.includes('locked') && handleOnKeyUp(key, index)}
										// need to be reviewed
										suppressContentEditableWarning={true}
									>
										{char.replacement ? char.replacement : char.letter}
									</span>
									{!char.hasClass.includes('locked') && (
										<span
											className="add-letter right"
											onClick={handleAddLetterRight(key, index, char.letter)}
										>
											<span className="entypo-plus"></span>
										</span>
									)}
									{!char.hasClass.includes('locked') && (
										<span
											className="show-keyboard"
											onClick={handleExpandKeyboard(key, index, char.letter)}
										>
											<span className="entypo-down-open"></span>
										</span>
									)}
								</span>
							);
						})}
						<span className="remove-syllable" onClick={handleRemoveSyllable(key)}>
							<span className="entypo-erase"></span>
						</span>
					</span>
				);
			})}
		</>
	);
};

export default PdssSyllableComponent;
