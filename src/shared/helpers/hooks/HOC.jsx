import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

const WithRouter = Component => {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let [searchParams] = useSearchParams();
		let params = useParams();
		return <Component {...props} currentRouter={{ location, navigate, params, searchParams }} />;
	}

	return withTranslation()(ComponentWithRouterProp);
};

export default WithRouter;
