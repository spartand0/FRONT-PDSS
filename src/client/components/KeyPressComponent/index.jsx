import { useEffect } from 'react';

export default function OnKeyPressComponent({ next, previous, children, fPress, rPress,iPress, spacePress }) {
	function handleKeyDown(e) {
		if (document.activeElement === document.body) {
			if (e.code.includes('ArrowLeft')) previous&& previous();
			if (e.code.includes('ArrowRight')) next && next();
			if (e.code.includes('KeyF')) fPress && fPress();
			if (e.code.includes('KeyR')) rPress && rPress();
			if (e.code.includes('KeyI')) iPress && iPress();
			if (e.code.includes('Space')) spacePress && spacePress();
		}
	}
	useEffect(() => {
		document.addEventListener('keyup', handleKeyDown);
		return function cleanup() {
			document.removeEventListener('keyup', handleKeyDown);
		};
	});
	return children;
}
