import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PdssResultKeyboardComponent = props => {
	const { ContextExtendedResult } = props;
	const {
		setExpandKeyboard,
		setElements,
		elements,
		selected,
		setUpdate
	} = useContext(ContextExtendedResult);
	const handleCloseKeyboard = () => {
		setExpandKeyboard(false);
	};

	const keyboardReplacement = [
		{ group: 'a', letters: ['α', 'ɐ', 'æ'],elementKey:uuidv4() },
		{ group: 'c', letters: ['ç'] ,elementKey:uuidv4()},
		{ group: 'e', letters: ['ɛ', 'ə'],elementKey:uuidv4() },
		{ group: 'i', letters: ['ɪ'] ,elementKey:uuidv4()},
		{ group: 'm', letters: ['ɱ'],elementKey:uuidv4() },
		{ group: 'n', letters: ['ŋ'] ,elementKey:uuidv4()},
		{ group: 'o', letters: ['ɔ', 'ø', 'œ'] ,elementKey:uuidv4()},
		{ group: 'r', letters: ['ʀ', 'ʁ'] ,elementKey:uuidv4()},
		{ group: 's', letters: ['ʃ', 'ʒ'],elementKey:uuidv4() },
		{ group: 'u', letters: ['ʊ'],elementKey:uuidv4() },
		{ group: 'y', letters: ['Y'],elementKey:uuidv4() },
		{ group: '', letters: ['ʔ'],elementKey:uuidv4() }
	];

	const handleClick = char => event => {
		elements[selected.key].letters[selected.index].replacement = char;
		elements[selected.key].letters[selected.index].key = selected.key;
		elements[selected.key].letters[selected.index].index = selected.index;
		if (!elements[selected.key].letters[selected.index].hasClass.includes('replaced'))
			elements[selected.key].letters[selected.index].hasClass =
				elements[selected.key].letters[selected.index].hasClass + ' replaced';
		setElements([...elements]);
		setUpdate(true);

	};
	return (
		<>
			<div className="keyboard" style={{ display: 'block' }}>
				<a className="close" onClick={handleCloseKeyboard}>
					<span className="entypo-cancel-squared"></span>
				</a>
				<ul className="letters">
					{keyboardReplacement.map((element) => {
						return (
							<li key={element.elementKey}>
								<span className="letter group" >
									{element.group}
								</span>
								{element.letters.map((char) => {
									return (
										<span className="letter" key={char} onClick={handleClick(char)}>
											{char}
										</span>
									);
								})}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default PdssResultKeyboardComponent;
