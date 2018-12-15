import React from "react";
import { object, string, mixed } from "yup";
import { withFormik } from "formik";
import {
    Input,
    InputList,
    Label,
    Radio,
    Button,
    ButtonTitle
} from "../Controls/Inputs";
import NewPasswordInput from "../Controls/NewPasswordInput";
import DatePicker from "../Controls/DatePicker";
import { Horizontal, Error, LoadingSpinner } from "../Templates/Templates";
import emailSchema from "../../utils/Schemas/EmailSchema";
import dateSchema from "../../utils/Schemas/DateSchema";
import passwordSchema from "../../utils/Schemas/PasswordSchema";
import { Link } from "@reach/router";
import api from "../../utils/api";

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
                setVisiblePassword={value =>
                    setStatus({ visiblePassword: value })
                }
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
                    {touched.gender && errors.gender && (
                        <span>{errors.gender}</span>
                    )}
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
            </Link>
            .
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
    validationSchema: object().shape({
        name: string().required("is required"),
        email: emailSchema,
        password: passwordSchema,
        date: dateSchema,
        gender: mixed()
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
        api.post("/signup", transformedValues)
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

export default SignUpForm;
