import React from "react";
import Yup from "yup";
import axios from "axios";
import SecureLS from "secure-ls";
import { withFormik } from "formik";
import { Input, InputList, Label, Button, ButtonTitle } from "../UI/Inputs";
import { MailIcon, LockIcon, VisibilityIcon } from "../Icons/Icons";
import { Link } from "react-router-dom";
import { login } from "../../actions/index";
import { Error } from "../Templates/Templates";

const InnerForm = ({
	values,
	errors,
	touched,
	handleSubmit,
	handleChange,
	handleBlur,
	isSubmitting,
	setStatus,
	status = { visiblePassword: false }
}) => (
	<form onSubmit={handleSubmit}>
		<Error style={{ textAlign: "center" }}>{errors.general}</Error>
		<InputList>
			<Input
				id="email"
				name="email"
				value={values.email}
				onChange={handleChange}
				onBlur={handleBlur}
				invalid={touched.email && errors.email}
				errorMessage={errors.email}
				disabled={isSubmitting}
				spellCheck="false"
				autoCorrect="false"
				autoCapitalize="false"
				icon
			>
				<MailIcon />
				<Label htmlFor="email" icon>
					Email
				</Label>
			</Input>

			<Input
				type="password"
				id="password"
				type={status.visiblePassword ? "text" : "password"}
				value={values.password}
				name="password"
				invalid={touched.password && errors.password}
				errorMessage={errors.password}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isSubmitting}
				spellCheck="false"
				autoCorrect="false"
				autoCapitalize="false"
				icon
			>
				<LockIcon />
				<Label htmlFor="password" icon>
					Password
				</Label>
				<VisibilityIcon
					visiblePassword={status.visiblePassword}
					setVisiblePassword={value =>
						setStatus({ visiblePassword: value })
					}
				/>
			</Input>
		</InputList>

		<div
			style={{
				marginTop: "6px",
				fontSize: ".85rem",
				opacity: 0.7,
				marginLeft: "52.5%",
				textAlign: "right"
			}}
		>
			<Link to="/reset_password">Forgot password?</Link>
		</div>

		<Button
			style={{ width: "320px", marginTop: "12px" }}
			name="login"
			type="submit"
			disabled={isSubmitting}
			formNoValidate
		>
			<ButtonTitle>Login</ButtonTitle>
		</Button>
	</form>
);

const LoginForm = withFormik({
	mapPropsToValues: props => ({
		email: "",
		password: ""
	}),
	validationSchema: Yup.object().shape({
		email: Yup.string().email("is invalid"),
		password: Yup.string()
	}),
	handleSubmit: (values, { props, setSubmitting, setErrors, setStatus }) => {
		setStatus({ visiblePassword: false });
		axios
			.post("http://localhost:3000/login", values)
			.then(response => {
				console.log(response);
				if (response.data.verified == false) {
					props.loggedInUnverified(response.data);
				}
				props.login(response.data);
			})
			.then(response => {
				console.log("is this undefined?", response);
			})
			.catch(error => {
				console.log(error);
				setSubmitting(false);
				setErrors({ general: error.response.data.message });
			});
	}
})(InnerForm);

export default LoginForm;
