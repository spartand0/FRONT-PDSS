/* eslint-disable */
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import routes from '../../../config/routes';
import { useDispatch } from 'react-redux';
import { setSearchStatus, setSearchText } from '../../../store/reducers/user.reducer';

export default props => {
	const {
		t,
		form_action_edit,
		sharedState,
		action_child_create,
		action_child_updateOne,
		action_shared_getGenders,
		action_shared_getLanguages,
		action_child_getOneById,
		SecuritiesState,
		currentRouter: { navigate, location }
	} = props;
	const [genders, setGenders] = useState([]);
	const [languages, setLanguages] = useState([]);
	const childId = new URLSearchParams(location.search).get('child');
	const dispatch = useDispatch();

	const schema = yup.object().shape({
		gender: yup.string().required(t('required')),
		firstName: yup.string().required(t('required')),
		lastName: yup.string().required(t('required')),
		birthDay: yup.string().required(t('required')),
		other: yup.string(),
		languages: yup.array().min(1, t('lang_error_msg')).required(t('required')).nullable()
	});

	useEffect(() => {
		action_shared_getGenders();
		action_shared_getLanguages();
	}, []);

	useEffect(() => {
		if (sharedState?.genders) setGenders(sharedState?.genders);
		if (sharedState?.languages) {
			setLanguages(sharedState?.languages);
		}
	}, [sharedState?.genders, sharedState?.languages]);

	useEffect(() => {
		childId && action_child_getOneById(childId);
	}, [childId]);

	const FormDetails = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			gender: '',
			firstName: '',
			lastName: '',
			birthDay: '',
			other: '',
			languages: ''
		},
		resolver: yupResolver(schema)
	});

	const onSubmit = async data => {
		await dispatch(setSearchStatus(false));
		await dispatch(setSearchText(''));
		if (form_action_edit)
			action_child_updateOne({
				userId: SecuritiesState?.userId,
				childId: childId,
				body: data,
				navigate: navigate
			});
		else
			action_child_create({
				userId: SecuritiesState?.userId,
				body: data,
				navigate: navigate
			});
	};
	const handleCancelForm = () => {
		navigate(routes.account_pages.children.child_page.navigationPath);
	};

	return {
		FormController: FormDetails,
		onSubmit,
		genders,
		languages,
		handleCancelForm
	};
};
