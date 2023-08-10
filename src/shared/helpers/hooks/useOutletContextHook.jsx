import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const useOutletContextHook = (title, hideBox) => {
	const { setTitle, setHideBox } = useOutletContext();
	useEffect(() => {
		setTitle(title);
		setHideBox(hideBox);
	}, []);
};
