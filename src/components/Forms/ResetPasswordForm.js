import React from "react";
import Yup from "yup";
import api from "../../utils/api";
import { withFormik } from "formik";
import { Button, Input, Label, ButtonTitle } from "../Controls/Inputs";
import { MailIcon } from "../Icons/Icons";

const InnerForm = ({
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting
}) => (
    <form onSubmit={handleSubmit}>
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
        <Button
            style={{ width: "320px", marginTop: "1.5rem" }}
            name="login"
            type="submit"
            disabled={isSubmitting}
            formNoValidate
        >
            <ButtonTitle>Submit</ButtonTitle>
        </Button>
    </form>
);

const ResetPasswordForm = withFormik({
    mapPropsToValues: props => ({
        email: ""
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("is invalid")
            .required("is required")
    }),
    handleSubmit: async (
        values,
        { props, setSubmitting, setErrors, setStatus }
    ) => {
        const recaptcha = await props.getRecaptchaToken();
        const email = values.email.trim();
        props.setSubmitted(email);
        api.post("/requestreset", {
            email,
            recaptcha
        }).then(response => {
            console.log(response);
        });
    }
})(InnerForm);

export default ResetPasswordForm;
