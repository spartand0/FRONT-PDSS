export default class UserMetaData {
	// ? not using the same object keys
	// ? just to update the view input names/ids to auth 0 metadata model requirement

	constructor({ lastName, firstName, acceptedTerms }) {
		this.family_name = lastName;
		this.given_name = firstName;
		this.accepted_terms = acceptedTerms;
	}

	getMetaData() {
		return {
			user_metadata: {
				family_name: this.family_name,
				given_name: this.given_name
				// accepted_terms: this.accepted_terms
			}
		};
	}
}
