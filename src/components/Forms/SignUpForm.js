import React from "react";
import Yup from "yup";
import { withFormik } from "formik";
import {
	Input,
	InputList,
	Icon,
	Label,
	Radio,
	Button,
	ButtonTitle,
	NewPasswordInput
} from "../UI/Inputs";
import DatePicker from "../UI/DatePicker";
import {
	Pane,
	Logo,
	WelcomeHeading,
	Horizontal,
	Error,
	LoadingSpinner
} from "../Templates/Templates";
import { isLeapYear, getMonth } from "../../Utility";
import zxcvbn from "zxcvbn";
import axios from "axios";
import { Link } from "react-router-dom";
import withRecaptcha from "../HOC/Recaptcha";

const InnerForm = ({
	values,
	errors,
	touched,
	handleSubmit,
	handleChange,
	setFieldValue,
	handleBlur,
	isSubmitting,
	setStatus,
	status = { visiblePassword: false }
}) => (
	<form onSubmit={handleSubmit}>
	<InputList>
		<Input
			name="name"
			value={values.name}
			onChange={handleChange}
			onBlur={handleBlur}
			invalid={touched.name && errors.name}
			errorMessage={errors.name}
			disabled={isSubmitting}
			noEmoji
		>
			<Label>Name</Label>
		</Input>

		<Input
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
		>
			<Label>Email</Label>
		</Input>

		<NewPasswordInput
			value={values.password}
			name="password"
			invalid={touched.password && errors.password}
			errorMessage={errors.password}
			onChange={handleChange}
			onBlur={handleBlur}
			disabled={isSubmitting}
			visiblePassword={status.visiblePassword}
			setVisiblePassword={value => setStatus({ visiblePassword: value })}
			spellCheck="false"
			autoCorrect="false"
			autoCapitalize="false"
		/>
	</InputList>

		<Horizontal style={{ marginTop: "1.5rem", fontSize: "0.93rem" }}>
			<DatePicker
				date={values.date}
				onChange={event =>
					setFieldValue("date", {
						...values.date,
						[event.target.name]: event.target.value
					})
				}
				touched={touched}
				errors={errors}
				onBlur={handleBlur}
				disabled={isSubmitting}
				label="Birthday"
			/>
			<div>
				<span style={{ marginLeft: "0.1rem" }}>Gender</span>

				<Horizontal
					style={{
						marginTop: "5px",
						color: "#3f3f3f",
						padding: "0.04rem"
					}}
					invalid={touched.gender && errors.gender}
					border
				>
					<Radio
						id="female"
						name="gender"
						value="F"
						label="Female"
						onChange={handleChange}
						checked={values.gender === "F"}
						disabled={isSubmitting}
					/>

					<Radio
						id="male"
						name="gender"
						value="M"
						label="Male"
						onChange={handleChange}
						checked={values.gender === "M"}
						disabled={isSubmitting}
					/>
				</Horizontal>

				<Error
					style={{
						paddingTop: "0.35rem",
						height: "1.7rem"
					}}
				>
					{touched.gender &&
						errors.gender && <span>{errors.gender}</span>}
				</Error>

				<Button
					style={{
						width: "150px",
						marginTop: "0.5rem"
					}}
					type="submit"
					disabled={isSubmitting}
					name="signup"
					formNoValidate
				>
					<ButtonTitle>
						{isSubmitting ? <LoadingSpinner /> : "Create Account"}
					</ButtonTitle>
				</Button>
			</div>
		</Horizontal>

		<div
			style={{
				fontSize: "0.7rem",
				marginTop: "1rem",
				textAlign: "right",
				color: "#777"
			}}
		>
			By signing up, you agree to the{" "}
			<Link to="/" target="_blank">
				Terms of Service
			</Link>{" "}
			and{" "}
			<Link to="/" target="_blank">
				Privacy Policy
			</Link>.
		</div>
	</form>
);

const SignUpForm = withFormik({
	mapPropsToValues: props => ({
		name: "",
		email: "",
		password: "",
		date: {
			day: "0",
			month: "0",
			year: "0"
		},
		gender: "",
		recaptcha: ""
	}),
	validationSchema: Yup.object().shape({
		name: Yup.string().required("is required"),
		email: Yup.string()
			.trim()
			.email("is invalid")
			.required("is required"),
		password: Yup.string()
			.required("is required")
			.test(
				"is-strong-enough",
				"must be at least medium strength (3 bars)",
				password => password && zxcvbn(password).score >= 2
			),
		date: Yup.object().shape({
			day: Yup.number()
				.integer()
				.min(1, "Select a Day")
				.max(31)
				.when(
					"month",
					(month, schema) =>
						month === 9 ||
						month === 4 ||
						month === 6 ||
						month === 11
							? schema.max(
									30,
									`${getMonth(month)} only has 30 days`
							  )
							: schema
				)
				.when(
					["month", "year"],
					(month, year, schema) =>
						month == 2
							? schema.max(
									28,
									`There were only 28 days in February in ${year}`
							  )
							: schema
				)
				.when(
					["year", "month"],
					(year, month, schema) =>
						isLeapYear(year) && month == 2
							? schema.max(
									29,
									`There were only 29 days in February in ${year}`
							  )
							: schema
				),
			month: Yup.number()
				.integer()
				.min(1, "Select a Month")
				.max(12)
				.required("Select a Month"),
			year: Yup.number()
				.integer()
				.min(1905, "Select a Year")
				.max(new Date().getFullYear())
				.required("Select a Year")
		}),
		gender: Yup.mixed()
			.required("Select your gender")
			.oneOf(["M", "F"])
	}),
	handleSubmit: async (
		values,
		{ props, setSubmitting, setErrors, setStatus }
	) => {
		setStatus({ visiblePassword: false });
		const recaptcha = await props.getRecaptchaToken();
		const transformedValues = {
			...values,
			name: values.name.trim(),
			email: values.email.trim(),
			recaptcha
		};
		axios
			.post("http://localhost:3000/signup", transformedValues)
			.then(response => {
				setSubmitting(false);
				const { id, hashid, email } = response.data;
				props.setSubmitted(true, id, hashid, email);
			})
			.catch(error => {
				setSubmitting(false);
				setErrors(transformErrors(error.response.data));
			});
	}
})(InnerForm);

const transformErrors = errors => {
	const errorTable = {
		1: { field: "email", message: "has already been taken" }
	};

	const record = errorTable[errors.code];
	return {
		[record.field]: record.message
	};
};

export default withRecaptcha(SignUpForm);
