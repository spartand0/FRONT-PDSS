import { useLocation } from 'react-router-dom';
import moment from 'moment';

import CryptoJS from 'crypto-js';
import config from '../../../config';

export const useCompareCurrentLocation = currentLocation => {
	const location = useLocation();
	return currentLocation === location.pathname;
};
export const mapBodyToQueries = body => {
	let queries = '?';
	body && Object.keys(body).map(query => body[query] && (queries += `${query}=${encodeURIComponent(body[query])}&`));
	queries = queries.substring(0, queries.length - 1);
	return queries;
};

export const obj2FormData = (obj, formData = new FormData()) => {
	this.formData = formData;

	this.createFormData = function (obj, subKeyStr = '') {
		for (let i in obj) {
			let value = obj[i];
			let subKeyStrTrans = subKeyStr ? subKeyStr + '[' + i + ']' : i;

			if (typeof value === 'string' || typeof value === 'number') {
				this.formData.append(subKeyStrTrans, value);
			} else if (typeof value === 'object') {
				this.createFormData(value, subKeyStrTrans);
			}
		}
	};

	this.createFormData(obj);

	return this.formData;
};

export const customDelay = ms => new Promise(res => setTimeout(res, ms));

export const stringToCamelCase = StringToCamelCase => {
	let splitWords = StringToCamelCase.split(' ');
	let lastWord = splitWords[splitWords?.length - 1];
	lastWord = lastWord[0].toUpperCase() + lastWord.slice(1);
	splitWords[splitWords?.length - 1] = lastWord;
	return splitWords.join(' ');
};

export const deleteCookies = () => {
	const allCookies = document.cookie.split(';');

	// The "expire" attribute of every cookie is
	for (let cookieValue of allCookies)
		document.cookie = cookieValue + '=;expires=' + new Date(0).toUTCString();
};

export const getAge = birth => {
	const endDate = moment(birth, 'DD-MM-YYYY');
	let months = moment().diff(endDate, 'months', true);
	return Math.floor(months / 12) + ';' + (Math.floor(months) % 12);
};

export const getUserSUBId = () =>
	localStorage.getItem('profile') && encodeURIComponent(JSON.parse(localStorage.getItem('profile'))?.sub);

export const getUserAuthProfileItem = key =>
	localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile'))?.[key];
export const eraseCookie = name => {
	document.cookie = name + '=; Max-Age=-99999999;';
};
export const getItemsFromCookies = key => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${key}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

export const getDistance = id => {
	return id % 2 !== 0 ? 'odd' : 'even';
};

// calculate age per month (arg => birthday)
export const calculateAgePerMonth = arg => {
	const age = moment(arg, 'DD/MM/YYYY');
	const months = moment().diff(age, 'months', false);
	return months;
};
export const mapWindowsParamsQueriesToObject = key => {
	const params = new URLSearchParams(window.location.search);
	return {
		exist: params.has(key),
		value: params.get(key)
	};
};

export const mapCurrentLocationQueriesToJSON = (additionalQueries = {}) => {
	const search = window.location.search.substring(1);
	let queries = Object.fromEntries(new URLSearchParams(search));
	return mapBodyToQueries(
		Object.assign(
			{},
			{
				...queries,
				...additionalQueries
			}
		)
	);
};
export const mapCurrentLocationQueriesToJSONAside = (newQueries = {}) => {
	const search = window.location.search.substring(1);
	let queries = Object.fromEntries(new URLSearchParams(search));
	if (queries['session']) queries['session'] = '';
	return mapBodyToQueries(
		Object.assign(
			{},
			{
				...queries,
				...newQueries
			}
		)
	);
};
export const waitForElm = selector => {
	return new Promise(resolve => {
		if (document.querySelectorAll(selector)) {
			return resolve(document.querySelectorAll(selector));
		}

		const observer = new MutationObserver(mutations => {
			if (document.querySelectorAll(selector)) {
				resolve(document.querySelectorAll(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
};

export const CryptoProviders = data => ({
	hashIt: () => CryptoJS.AES.encrypt(data, config.hashSlatSecret).toString(),
	word: () => CryptoJS.AES.decrypt(data, config.hashSlatSecret).toString(CryptoJS.enc.Utf8),
	token: () => CryptoJS.SHA256(data + config.hashSlatSecret)
});

export const getPercent = diagnostic_group => {
	let count = 0;
	let total = diagnostic_group.diagnostics.length;
	diagnostic_group.diagnostics.map(diagnostic => {
		if (diagnostic.process_percent == 100) count += 1;
	});

	return Math.round((count / total) * 100);
};

export const linkIsActive = path => (window.location.pathname === path ? 'active' : ' ');
export const navLinkIsActive = item => {
	if (item.parent) {
		if (window.location.pathname.includes(item.path.slice(0, item.path.lastIndexOf('?'))))
			return 'active'
	}
	else {
		return linkIsActive(item.path)
	}
}


export const progressRing = (percent, radius) => {
	let circumference = radius * 2 * Math.PI;
	let strokeDasharray = circumference + ' ' + circumference;
	let strokeDashoffset = circumference - (percent / 100) * circumference;
	return { strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset };
};
export const scrollToTop = () =>
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});

export const textSpeechProvider = text => {
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'de-DE';
	utterance.voiceURI = 'de-DE-Standard-A';
	speechSynthesis.speak(utterance);
};

export const replaceLine = (line) => {
	const result = new DOMParser().parseFromString(line, 'text/html');
	return result.body.textContent || '';
};