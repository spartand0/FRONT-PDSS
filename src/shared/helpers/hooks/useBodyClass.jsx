import { useEffect } from 'react';

const addBodyClass = className => document.body.classList.add(className);
const removeBodyClass = className => document.body.classList.remove(className);

export default function useBodyClass(width) {
	useEffect(() => {
		if (width < 1200) {
			removeBodyClass('desktop');
			/* Tablet */
			if (width < 980) {
				addBodyClass('tablet');

				/* Smartphone */
				if (width <= 770) {
					addBodyClass('mobile');
				} else {
					removeBodyClass('mobile');
				}
			} else {
				removeBodyClass('tablet');
				removeBodyClass('mobile');
			}
		} else {
			addBodyClass('desktop');
		}
	}, [width]);
}
