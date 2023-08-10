/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment';
import { useState, createRef, useMemo, useCallback } from 'react';
import config from '../../../config';

const PDSSResultAudioComponent = ({ records, handleShowDelete }) => {
	// State to keep track of the currently selected audio and its playback status
	const [selectedAudio, setSelectedAudio] = useState({
		played: false,
		range: 0,
		id: ''
	});
	// Event handler for the play button
	const handlePlay = useCallback(
		element => () => {
			setSelectedAudio({
				played: true,
				range: element.audioRef.current.currentTime,
				id: element.id
			});
			element.audioRef.current.play();
		},
		[]
	);

	// Event handler for the pause button
	const handlePause = useCallback(
		element => () => {
			setSelectedAudio(prevState => ({
				...prevState,
				played: false
			}));
			element.audioRef.current.pause();
		},
		[]
	);

	// Event handler for the range slider
	const handleChangeRange = useCallback(
		element => event => {
			if (selectedAudio.id !== element.id) {
				setSelectedAudio({
					id: element.id
				});
			}
			element.audioRef.current.currentTime = event.target.value;
		},
		[selectedAudio.id]
	);

	// Event handler for the time update event of the audio element
	const handleTimeUpdate = useCallback(
		element => () => {
			setSelectedAudio(prevState => ({
				...prevState,
				range: element.audioRef.current.currentTime
			}));
		},
		[]
	);

	// Event handler for the ended event of the audio element
	const handleEnded = useCallback(() => {
		setSelectedAudio(prevState => ({
			...prevState,
			played: false,
			range: 0
		}));
	}, []);

	// Memoized version of the records array with audioRef property added to each element
	const memoizedRecords = useMemo(
		() =>
			records?.map(element => {
				const audioRef = createRef();
				return {
					...element,
					audioRef
				};
			}),
		[records]
	);

	return (
		<ul>
			{memoizedRecords.map((element) => (
				<li key={element.id}>
					<div className="grid-x">
						<div className="cell small-4">
							<p>{moment(element.created).format('DD.MM.YYYY HH:mm')}</p>
							<audio
								ref={element.audioRef}
								src={`${config.API_Config.BackEnd_ORIGIN}/${element.filepath}${element.filename}`}
								className="binded"
								onTimeUpdate={handleTimeUpdate(element)}
								onEnded={handleEnded}
							/>
						</div>
						<div className="cell small-1">
							<a
								className={selectedAudio.played && selectedAudio.id !== element.id ? 'play' : 'pause'}
								onClick={!selectedAudio.played ? handlePlay(element) : handlePause(element)}
							>
								<span
									className={`entypo entypo-${
										selectedAudio.played && selectedAudio.id === element.id ? 'pause' : 'play'
									}`}
								/>
							</a>
						</div>
						<div className="cell small-2">
							<p>{moment.utc(element.duration_in_seconds * 1000).format('HH:mm:ss')}</p>
						</div>
						<div className="cell small-4">
							<input
								type="range"
								className="audio-slider"
								min="0"
								value={element.id === selectedAudio.id ? selectedAudio.range : 0}
								step="0.01"
								onChange={handleChangeRange(element)}
								max={element.duration_in_seconds}
							/>
						</div>
						<div className="cell small-1">
							<a className="remove" onClick={handleShowDelete(element)}>
								<span className="entypo-trash" />
							</a>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default PDSSResultAudioComponent;
