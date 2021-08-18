import Link from 'next/link';
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import useValidation from '../hooks/useValidation';
import validation from '../validation/validation';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Page({res, status, initialState, path}) {
	const baseURL = 'http://localhost:3000';
	const [errorServerMsg, setErrorServerMsg] = useState('');
	const {title, inputs} = res;
	const [error, setError] = useState(false);
	useEffect(() => {
		if (inputs && inputs.length) {
			inputs.forEach((element) => {
				if (element.type == 'confirm_password') {
					element.name = 'confirmPassword';
					element.type = 'password';
				}
				if (
					element.type != 'button' &&
					element.type != 'link' &&
					element.type != 'checkbox'
				) {
					initialState[element.name] = '';
				}
			});
		} else {
			setErrorServerMsg(res.msg);
		}
	}, [inputs]);

	const {values, errors, handleBlur, handleChange, handleSubmit} =
		useValidation(initialState, validation, requestServer);
	async function requestServer() {
		try {
			const requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(values),
			};
			fetch(`${baseURL}/${path}`, requestOptions).then((response) =>
				response.json()
			);
		} catch (e) {
			setError(true);
			throw e;
		}
	}
	return (
		<div className='container col-md-6 col-sm-12 my-5'>
			{error ? (
				<Alert color='danger'>An error ocurred, please restart later</Alert>
			) : null}
			<h1>{title}</h1>
			{status == 200 && inputs.length ? (
				<Form onSubmit={handleSubmit} noValidate>
					{inputs.map((el, index) =>
						el.type != 'button' ? (
							el.type != 'link' ? (
								el.type == 'select' ? (
									<FormGroup key={index} className='my-3'>
										<Label>{el.label}</Label>
										<Input
											value={values[el.name] || ''}
											type='select'
											name={el.name}
											onChange={handleChange}
										>
											{el.options.map((optionsSelect, index) => (
												<option key={index} value={optionsSelect.value}>
													{optionsSelect.label}
												</option>
											))}
										</Input>
										{errors[el.name] ? (
											<Alert color='danger' className='p-1'>
												{errors[el.name]}
											</Alert>
										) : null}
									</FormGroup>
								) : (
									<FormGroup key={index} className='my-3'>
										<Label>{el.label}</Label>
										<Input
											value={values[el.name] || ''}
											type={el.type}
											name={el.name}
											id={el.index}
											required={el.required}
											pattern={el.regex}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors[el.name] ? (
											<Alert color='danger' className='p-1'>
												{errors[el.name]}
											</Alert>
										) : null}
									</FormGroup>
								)
							) : (
								<div className='row'>
									<a
										target='_blank'
										rel='noopener noreferrer'
										key={index}
										href={el.to || el.target}
									>
										{el.label || el.text}
									</a>
								</div>
							)
						) : (
							<div className='d-flex justify-content-end '>
								<Button
									key={index}
									color='primary'
									type='submit'
									className='my-5'
								>
									{el.label}
								</Button>
							</div>
						)
					)}
				</Form>
			) : (
				<Alert color='danger'>{errorServerMsg}</Alert>
			)}
		</div>
	);
}
Page.getInitialProps = async ({query}) => {
	const {path} = query;
	const res = await fetch(`http://localhost:3000/configuration/${path}`);
	const json = await res.json();
	const initialState = {};
	return {
		res: json,
		status: res.status,
		initialState: initialState,
		path: path,
	};
};
export default Page;
