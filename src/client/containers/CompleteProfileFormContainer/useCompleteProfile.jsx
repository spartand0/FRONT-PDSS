import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import UserMetaData from '../../../models/user';
import { clearMetaDataProcess } from '../../../store/reducers/securities.reducers';

export default props => {
	const { action_securities_updateProfile } = props;
	const dispatch = useDispatch();
	const schema = yup.object().shape({
		lastName: yup.string().required(),
		firstName: yup.string().required(),
		acceptedTerms: yup.boolean().oneOf([true])
	});

	const FormDetails = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			lastName: '',
			firstName: ''
		},
		resolver: yupResolver(schema)
	});

	const setUserMetaDataVerified = () => dispatch(clearMetaDataProcess());

	const onSubmit = data => {
		const user = new UserMetaData(data);
		action_securities_updateProfile(user.getMetaData());
	};
	return {
		FormController: FormDetails,
		setUserMetaDataVerified,
		onSubmit
	};
};
