import {useState, useEffect} from 'react';

const useValidation = (initialState, validation, fn) => {
	const [values, setValues] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [submitForm, setSubmitForm] = useState(false);
	const [valuesValidations, setValuesValidations] = useState({});

	useEffect(() => {
		if (submitForm) {
			const noerrores = Object.keys(errors).length === 0;
			if (noerrores) {
				fn();
			}
			setSubmitForm(false);
		}
	}, [errors]);

	const handleChange = (e) => {
		setValues({
			...values,
			[[e.target.name][0]]: e.target.value,
		});
		setValuesValidations({
			...valuesValidations,
			[[e.target.name][0]]: e.target.pattern,
		});
		setErrors({
			...errors,
			[[e.target.name][0]]: '',
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const errorValidation = validation(values, valuesValidations);
		setErrors(errorValidation);
		setSubmitForm(true);
	};
	const handleBlur = () => {
		const errorValidation = validation(values, valuesValidations);
		setErrors(errorValidation);
	};
	return {
		values,
		errors,
		handleChange,
		handleSubmit,
		handleBlur
	};
};
export default useValidation;
