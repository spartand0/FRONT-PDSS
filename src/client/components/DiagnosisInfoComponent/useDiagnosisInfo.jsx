/* eslint-disable */
import { useState } from 'react';

// Custom hook for handling gallery display and tab clicks
export default props => {
	const [showGallery, setShowGallery] = useState({
		show: false,
		image: ''
	});

	// Toggle the showGallery state and set the selected image
	const handleShowGallery = image =>
		setShowGallery(prev => ({
			show: !prev.show,
			image: image
		}));

	const dataParserForInformationTabs = data => {
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(data, 'text/html');
		let items = [...htmlDoc.body.children];
		const tabsTitle = [];
		const tabsContent = [];

		items.forEach(element => {
			switch (true) {
				case element.classList.contains('tabs'): {
					element.childNodes.forEach(child => {
						if (['LI', 'li'].includes(child.nodeName)) {
							tabsTitle.push(child.childNodes[0].innerHTML);
						}
					});
					break;
				}
				case element.classList.contains('tabs-content'): {
					element.childNodes.forEach(child => {
						if (['DIV', 'div'].includes(child.nodeName)) {
							tabsContent.push(child.innerHTML);
						}
					});
					break;
				}
				default:
					break;
			}
		});
		return { tabsTitle, tabsContent };
	};

	// Return the custom hook's state and methods
	return {
		showGallery: showGallery,
		handleShowGallery: handleShowGallery,
		dataParserForInformationTabs,
		setShowGallery
	};
};
