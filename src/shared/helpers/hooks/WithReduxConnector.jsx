import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions';

const WithReduxConnector = (Component, mapStateToProps) => {
	function ConnectedComponentConsumer(props) {
		return <Component {...props} />;
	}
	function mapDispatchToProps(dispatch) {
		return bindActionCreators(Actions, dispatch);
	}
	return connect(mapStateToProps, mapDispatchToProps)(ConnectedComponentConsumer);
};

export default WithReduxConnector;
