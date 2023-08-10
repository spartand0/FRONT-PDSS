import React, { Fragment } from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { DefaultFooter } from '../../containers/DefaultFooter';
import DefaultHeader from '../../containers/DefaultHeader';
import { connect } from 'react-redux';

const DefaultLayout = props => {
	const { children } = props;
	return (
		<Fragment>
			<DefaultHeader {...props} />
			{children}

			<DefaultFooter {...props} />
		</Fragment>
	);
};

export default connect(
	state => ({
		SecuritiesState: state.GlobalSecuritiesSate
	}),
	{}
)(WithRouter(DefaultLayout));
