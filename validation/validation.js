export default function validateLogIn(values, validations) {
	let errors = {};
	if (!values.username) {
		errors.username = 'username is required';
	} else if (!/validations.username/.test(values.username)) {
		errors.username = 'Invalid username';
	}

	if (!values.password) {
		errors.password = 'password is required';
	} else if (!/validations.password/.test(values.password)) {
		errors.password = 'Invalid password';
	}

	if (values.hasOwnProperty('country')) {
		if (!values.country) {
			errors.country = 'country is required';
		} else if (!/validations.country/.test(values.country)) {
			errors.country = 'Invalid country';
		}
	}

	if (values.hasOwnProperty('email')) {
		if (!values.email) {
			errors.email = 'email is required';
		} else if (!/validations.email/.test(values.email)) {
			errors.email = 'Invalid email';
		}
	}

	if (values.hasOwnProperty('fullname')) {
		if (!values.fullname) {
			errors.fullname = 'fullname is required';
		} else if (!/validations.fullname/.test(values.fullname)) {
			errors.fullname = 'Invalid fullname';
		}
	}
	if (values.hasOwnProperty('confirmPassword')) {
		if (!values.confirmPassword) {
			errors.confirmPassword = 'confirmPassword is required';
		} else if (!/validations.confirmPassword/.test(values.confirmPassword)) {
			errors.confirmPassword = 'Invalid confirmPassword';
		}
	}

	if (values.hasOwnProperty('custom_country')) {
		if (!values.custom_country) {
			errors.custom_country = 'custom_country is required';
		} else if (!/validations.custom_country/.test(values.custom_country)) {
			errors.custom_country = 'Invalid custom_country';
		}
	}
	return errors;
}
