import Link from 'next/link';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import useValidation from '../hooks/useValidation';
import validation from '../validation/validation';
import { useEffect, useState } from 'react';

function Page({ res, status, initialState, path }) {
	const baseURL = 'http://localhost:3000'
	const [errorServerMsg, setErrorServerMsg] = useState('')
	const { title, inputs } = res;
	useEffect(() => {
		if (inputs && inputs.length) {
			inputs.forEach((element) => {
				if (element.type === 'confirm_password') {
					element.type = 'password';
					element.name = 'confirmPassword';
				} else {
					if (
						element.type != 'button' &&
						element.type != 'link' &&
						element.type != 'checkbox'
					) {
						initialState[element.name] = '';
					}
				}
			});
		} else {
			setErrorServerMsg(res.msg)
		}
	}, [inputs]);

	const { values, errors, handleChange, handleSubmit } = useValidation(
		initialState,
		validation,
		requestServer
	);
	async function requestServer() {
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			};
			fetch(`${baseURL}/${path}`, requestOptions)
				.then((response) => response.json())
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			<h1>{title}</h1>
			{status == 200 && inputs.length ? (
				<Form onSubmit={handleSubmit} noValidate>
					{inputs.map((el, index) =>
						el.type != 'button' ? (
							el.type != 'link' ? (
								el.type == 'select' ? (
									<FormGroup key={index}>
										<Label>{el.label}</Label>
										<Input
											value={values[el.name]}
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
											<Alert color='danger'>{errors[el.name]}</Alert>
										) : null}
									</FormGroup>
								) : (
									<FormGroup key={index}>
										<Label>{el.label}</Label>
										<Input
											value={values[el.name]}
											type={el.type}
											name={el.name}
											id={el.index}
											required={el.required}
											pattern={el.regex}
											onChange={handleChange}
										/>
										{errors[el.name] ? (
											<Alert color='danger'>{errors[el.name]}</Alert>
										) : null}
									</FormGroup>
								)
							) : (
								<Link key={index} href={el.to || el.target} target='_blank'>
									{el.label || el.text}
								</Link>
							)
						) : (
							<Button key={index} type='submit'>
								{el.label}
							</Button>
						)
					)}
				</Form>
			) : (
					<Alert color='danger'>{errorServerMsg}</Alert>
			)}
		</div>
	);
}
Page.getInitialProps = async ({ query }) => {
	const { path } = query;
	const res = await fetch(`http://localhost:3000/configuration/${path}`);
	const json = await res.json();
	console.log(json);
	const initialState = {};
	return { res: json, status: res.status, initialState: initialState, path: path };
};
export default Page;
