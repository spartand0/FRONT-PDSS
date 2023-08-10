import { v4 as uuidv4 } from 'uuid';

export default props => {
	const parser = new DOMParser();
	const isValidSpanElement = element => {
		return ['SPAN', 'span'].includes(element.nodeName);
	};
	const createLetterObject = (letter, classValue) => {
		return {
			elementKey: uuidv4(),
			letter: letter,
			hasClass: classValue,
			type: classValue.includes('vowel') ? 'vowels' : 'consonants',
			replacement: '',
			replacements: {
				key: '',
				index: '',
				firstOption: {
					value: 0,
					name: ''
				},
				secondOption: {
					value: 0,
					name: ''
				},
				thirdOption: {
					value: 0,
					name: ''
				}
			}
		};
	};

	const checkNestedObjectFirstLevel = classValue => {
		return (
			classValue.includes('letter') ||
			classValue.includes('diphthong ei') ||
			classValue.includes('bond') ||
			classValue.includes('affricate')
		);
	};

	const checkNormalObjectFirstLevel = classValue => {
		return classValue.includes('bond') || classValue.includes('diphthong ei') || classValue.includes('affricate');
	};
	const handleFirstLevelSyllable = (data, obj) => {
		data.childNodes.forEach((syllableSpans, index) => {
			if (isValidSpanElement(syllableSpans) && checkNestedObjectFirstLevel(syllableSpans.classList.value)) {
				if (checkNormalObjectFirstLevel(syllableSpans.classList.value)) {
					obj = handleSecondLevelSyllable(syllableSpans, obj);
				} else {
					const newLetter = createLetterObject(syllableSpans.innerHTML, syllableSpans.classList.value);
					obj.letters.push(newLetter);
				}
			}
		});
		return obj;
	};
	const handleSecondLevelSyllable = (data, obj) => {
		data.childNodes.forEach(element => {
			if (isValidSpanElement(element)) {
				if (element.classList.value.includes('affricate')) {
					if (isValidSpanElement(element)) {
						element.childNodes.forEach(subElement => {
							if (isValidSpanElement(subElement)) {
								const newLetter = createLetterObject(subElement.innerHTML, subElement.classList.value);
								obj.letters.push(newLetter);
							}
						});
					}
				}
				const newLetter = createLetterObject(element.innerHTML, element.classList.value);
				obj.letters.push(newLetter);
			}
		});
		return obj;
	};
	const handleThirdLevelSyllable = (data, obj) => {
		data.childNodes.forEach(childNode => {
			if (['SPAN', 'span'].includes(childNode.nodeName)) {
				if (childNode.classList.value.includes('affricate')) {
					childNode.childNodes.forEach(element => {
						if (isValidSpanElement(element)) {
							const newLetter = createLetterObject(element.innerHTML, element.classList.value);
							obj.letters.push(newLetter);
						}
					});
				}
				const newLetter = createLetterObject(childNode.innerHTML, childNode.classList.value);
				obj.letters.push(newLetter);
			}
		});
		return obj;
	};

	const checkNestedObjectSecondLevel = classValue => {
		return classValue.includes('letter') || classValue.includes('diphthong ei');
	};
	const checkNormalObjectSecondLevel = classValue => {
		return classValue.includes('bond') || classValue.includes('diphthong ei') || classValue.includes('double');
	};
	const handleForthLevelSyllable = (data, obj) => {
		data.childNodes.forEach((syllableSpans, index) => {
			if (isValidSpanElement(syllableSpans) && checkNestedObjectSecondLevel(syllableSpans.classList.value)) {
				if (checkNormalObjectSecondLevel(syllableSpans.classList.value)) {
					obj = handleFifthLevelSyllable(syllableSpans, obj);
				} else {
					handleLastLevelSyllable(syllableSpans, obj);
				}
			}
		});
		return obj;
	};
	const handleLastLevelSyllable = (data, obj) => {
		let newLetter = createLetterObject('', data.classList.value);
		data.childNodes.forEach(child => {
			if (isValidSpanElement(child)) {
				if (child.classList.value === 'l') {
					newLetter.letter = child.innerHTML;
				}
			}
		});
		data.classList.remove('active');
		newLetter.hasClass = data.classList.value;
		if (!data.classList.value.includes('vowel')) newLetter.type = 'consonants';
		obj.letters.push(newLetter);
		return obj;
	};
	const handleFifthLevelSyllable = (data, obj) => {
		data.childNodes.forEach(element => {
			if (isValidSpanElement(element)) {
				if (element.classList.value === 'l') {
					element.classList.remove('active');
					const newLetter = createLetterObject(element.innerHTML, 'letter');
					obj.letters.push(newLetter);
				}
			}
		});
		return obj;
	};

	// data parser for original word
	const updateCurrentSpans = item => {
		const htmlDoc = parser.parseFromString(item, 'text/html');
		let items = [...htmlDoc.body.children];
		let formattedData = [];
		items.forEach(syllable => {
			let obj = {
				hasClass: '',
				elementKey: uuidv4(),
				letters: []
			};
			if (syllable.classList.value.includes('syllable')) {
				obj.hasClass = syllable.classList.value;
				obj = handleFirstLevelSyllable(syllable, obj);
			}
			if (syllable.classList.value.includes('letter')) {
				let newLetter = {
					elementKey: uuidv4(),
					letter: '',
					hasClass: '',
					type: '',
					replacement: '',
					replacements: {
						key: '',
						index: '',
						firstOption: {
							value: 0,
							name: ''
						},
						secondOption: {
							value: 0,
							name: ''
						},
						thirdOption: {
							value: 0,
							name: ''
						}
					}
				};
				newLetter.letter = syllable.innerHTML;
				newLetter.hasClass = syllable.classList.value;
				if (!syllable.classList.value.includes('vowel')) newLetter.type = 'consonants';

				obj.letters.push(newLetter);
			}
			if (
				syllable.classList.value.includes('double') ||
				syllable.classList.value.includes('diphthong') ||
				syllable.classList.value.includes('affricate') ||
				syllable.classList.value.includes('bond')
			) {
				obj = handleThirdLevelSyllable(syllable, obj);
			}

			formattedData.push(obj);
		});
		return formattedData;
	};
	// data parser for modified word
	const updateCurrentSpansAnswers = item => {
		const htmlDoc = parser.parseFromString(item, 'text/html');
		let items = [...htmlDoc.body.children];
		let formattedData = [];
		items.forEach((syllable, key) => {
			let obj = {
				elementKey: uuidv4(),
				hasClass: '',
				letters: []
			};
			if (key === 0 && syllable.getAttribute('data-json')?.length > 0) {
				obj.dataJson = JSON.parse(decodeURIComponent(atob(syllable.getAttribute('data-json'))));
			}
			obj.hasClass = syllable.classList.value;
			obj = handleForthLevelSyllable(syllable, obj);

			formattedData.push(obj);
		});
		return formattedData;
	};
	// get original word and modified word and detect changed chars
	const swapAndCheckData = (elements, prevElements) => {
		let modifiedSyllable = [];
		let originalSyllable = [];

		// get each char position
		elements.forEach((item, key) => {
			item.letters.map((letter, index) => {
				let obj = { elementKey: uuidv4(), key, index, char: letter.letter, hasClass: letter.hasClass };
				modifiedSyllable.push(obj);
			});
		});

		// get each char position and eliminate added chars
		prevElements.forEach((item, key) => {
			item.letters.forEach((letter, index) => {
				if (!letter.hasClass.includes('added')) {
					let obj = { elementKey: uuidv4(), key, index, char: letter.letter, hasClass: letter.hasClass };
					originalSyllable.push(obj);
				}
			});
		});
		modifiedSyllable.forEach((element, key) => {
			// add missing data to original data
			if (element.hasClass.includes('added')) {
				originalSyllable.splice(key, 0, element);
			}
			// compare and swap data from letter to replacement
			if (element.char !== originalSyllable[key].char && !element.hasClass.includes('added')) {
				elements[originalSyllable[key].key].letters[originalSyllable[key].index].replacement = element.char;
				elements[originalSyllable[key].key].letters[originalSyllable[key].index].letter =
					originalSyllable[key].char;
			}
		});
		return elements;
	};

	return { updateCurrentSpans, updateCurrentSpansAnswers, swapAndCheckData };
};
