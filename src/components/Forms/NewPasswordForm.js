import React from "react";
import { Button, ButtonTitle } from "../UI/Inputs";
import NewPasswordInput from "../UI/NewPasswordInput";
import { LoadingSpinner } from "../Templates/Templates";
import zxcvbn from "zxcvbn";
import { withFormik } from "formik";
import Yup from "yup";
import api from "../../utils/api";

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
        <NewPasswordInput
            title="New Password"
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
        <Button
            style={{
                width: "100%",
                marginTop: "1rem"
            }}
            type="submit"
            disabled={isSubmitting}
            name="signup"
            formNoValidate
        >
            <ButtonTitle>
                {isSubmitting ? <LoadingSpinner /> : "Create Password"}
            </ButtonTitle>
        </Button>
    </form>
);

const NewPasswordForm = withFormik({
    mapPropsToValues: props => ({
        password: ""
    }),
    validationSchema: Yup.object().shape({
        password: Yup.string()
            .required("is required")
            .test(
                "is-strong-enough",
                "must be at least medium strength",
                password => password && zxcvbn(password).score >= 2
            )
    }),
    handleSubmit: (values, { props, setSubmitting, setErrors, setStatus }) => {
        const { id, hashID, hash } = props;
        api.post("/newpassword", {
            id,
            hashID,
            hash,
            newPassword: values.password
        })
            .then(response => {
                props.setSubmitted();
                setSubmitting(false);
            })
            .catch(err => {
                setSubmitting(false);
            });
    }
})(InnerForm);

export default NewPasswordForm;
