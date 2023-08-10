export const isValidatedForm = error => {
	const getOne = inputName => error?.[inputName];
	const isValid = () => Object.keys(error).length;
	const getAll = () => error;
	return {
		getOne,
		isValid,
		getAll
	};
};
