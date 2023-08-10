import { useRef } from 'react';

export const useCAllBackHookFunction = fn => {
	const ref = useRef(fn);
	ref.current = fn;
	function wrapper() {
		return ref.current.apply(this, arguments);
	}
	return useRef(wrapper).current;
};
