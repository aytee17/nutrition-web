import React from "react";
import { Button, ButtonTitle } from "../Controls/Inputs";
import NewPasswordInput from "../Controls/NewPasswordInput";
import { LoadingSpinner } from "../Templates/Templates";
import { withFormik } from "formik";
import { object } from "yup";
import passwordSchema from "../../utils/Schemas/PasswordSchema";
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
    validationSchema: object().shape({
        password: passwordSchema
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
