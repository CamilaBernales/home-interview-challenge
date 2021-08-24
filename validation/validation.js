export default function validation(values, valuesValidations) {
	let errors = {};
	if (!values.username) {
		errors.username = 'username is required';
	} else {
		let pattern = new RegExp(valuesValidations.username);
		if (!pattern.test(values.username)) {
			errors.username = 'Invalid username';
		}
	}

	if (!values.password) {
		errors.password = 'password is required';
	} else {
		let pattern = new RegExp(valuesValidations.password);
		if (!pattern.test(values.password)) {
			errors.password = 'Invalid password';
		}
	}

	if (values.hasOwnProperty('country')) {
		if (!values.country) {
			errors.country = 'country is required';
		} else {
			let pattern = new RegExp(valuesValidations.country);
			if (!pattern.test(values.country)) {
				errors.country = 'Invalid country';
			}
		}
	}

	if (values.hasOwnProperty('email')) {
		if (!values.email) {
			errors.email = 'email is required';
		} else {
			let pattern = new RegExp(valuesValidations.email);
			if (!pattern.test(values.email)) {
				errors.email = 'Invalid email';
			}
		}
	}

	if (values.hasOwnProperty('fullname')) {
		if (!values.fullname) {
			errors.fullname = 'fullname is required';
		} else {
			let pattern = new RegExp(valuesValidations.fullname);
			if (!pattern.test(values.fullname)) {
				errors.fullname = 'Invalid fullname';
			}
		}
	}
	if (values.hasOwnProperty('confirmPassword')) {
		if (!values.confirmPassword) {
			errors.confirmPassword = 'confirmPassword is required';
		} else if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		} else if (values.confirmPassword) {
			let pattern = new RegExp(valuesValidations.confirmPassword);
			if (!pattern.test(values.fullname)) {
				errors.fullname = 'Invalid Password';
			}
		}
	}

	return errors;
}
