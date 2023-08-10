import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { action_update_timer } from '../../../store/actions/diagnosis.actions.js';
import { useSecond } from './useSecond.jsx';

export const useTimerV2 = ({ seconds: initialSeconds = 0, running: initiallyRunning = false } = {}) => {
	const dispatch = useDispatch();

	/* useEffect(()=>{
        dispatch(action_update_timer(initialSeconds))
    },[])*/

	const seconds = useRef(initialSeconds);
	const running = useRef(initiallyRunning);
	const tick = useCallback(() => {
		if (running.current) {
			seconds.current += 1;
			dispatch(action_update_timer(seconds.current));
		}
	}, [running.current]);
	const start = () => (running.current = true);
	const pause = () => (running.current = false);
	const reset = () => {
		seconds.current = 0;
		pause();
		dispatch(action_update_timer(seconds.current));
	};
	const initialize = value => {
		seconds.current = value;
	};
	const stop = () => {
		pause();
		reset();
	};
	const getCurrentTime = () => {
		
		return seconds.current;
	};
	useSecond(tick);

	return { pause, reset, running, seconds: seconds.current, start, stop, initialize, getCurrentTime };
};
