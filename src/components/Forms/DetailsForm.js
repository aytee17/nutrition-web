import React from "react";
import Yup from "yup";
import axios from "axios";
import { withFormik } from "formik";
import Slider from "../UI/Slider";
import {
    Button,
    Input,
    SmallLabel,
    ButtonTitle,
    FixedDisplay
} from "../UI/Inputs";
import { EER } from "../../utils/nutrition";
import { Horizontal } from "../Templates/Templates";
import style from "./DetailsForm.scss";

const InnerForm = ({
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    setFieldValue,
    setStatus,
    user
}) => {
    const age = Math.floor((Date.now() - new Date(user.dob)) / 31536000000);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <strong>Basic Information</strong>
            </div>
            <Horizontal style={{ paddingTop: "0.625rem" }}>
                <Input
                    name="weight"
                    number
                    required
                    value={values.weight}
                    autoComplete="off"
                    autoFocus
                    placeholder="#"
                    onChange={event => {
                        const { value } = event.target;
                        if (
                            !isNaN(value) &&
                            value.length < 4 &&
                            value[0] !== "0"
                        ) {
                            setFieldValue("weight", value);
                        }
                    }}
                    invalid={touched.weight && errors.weight}
                    onBlur={handleBlur}
                >
                    <SmallLabel>Weight</SmallLabel>
                    <span
                        style={{
                            position: "absolute",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "#2d3643",
                            left: "3.1rem",
                            bottom: "0.45rem"
                        }}
                    >
                        kg
                    </span>
                </Input>
                <Horizontal>
                    <FixedDisplay title="Age" content={age} />
                    <FixedDisplay title="Gender" content={user.gender} />
                </Horizontal>
            </Horizontal>

            <Slider
                title="Physical Activity Level"
                name="activity_level"
                min={0}
                max={12}
                width={"100%"}
                labels={{
                    0: "Bed Rest",
                    1: "Sedentary",
                    2: "Maintenance",
                    3: "Lightly Active",
                    4: "Lightly Active",
                    5: "Lightly Active",
                    6: "Moderately Active",
                    7: "Moderately Active",
                    8: "Moderately Active",
                    9: "Very Active",
                    10: "Very Active",
                    11: "Very Active",
                    12: "Extremely Active"
                }}
                value={values.activity_level}
                onChange={handleChange}
                onClick={value => event => {
                    setFieldValue("activity_level", value);
                }}
            />
            <br />
            <div style={{ marginTop: "1rem" }}>
                <strong>Estimated Energy Requirement</strong>
            </div>
            <div className={style["display"]}>
                <div>
                    {values.weight !== ""
                        ? `${Number(
                              EER(
                                  user.gender,
                                  age,
                                  values.weight,
                                  values.activity_level
                              )
                          ).toLocaleString()} kJ/day`
                        : ""}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row"
                }}
            >
                <Button
                    name="finish"
                    type="submit"
                    disabled={isSubmitting}
                    formNoValidate
                    style={{ marginTop: "1rem", width: "6rem" }}
                >
                    <ButtonTitle>Done</ButtonTitle>
                </Button>
            </div>
        </form>
    );
};

const DetailsForm = withFormik({
    mapPropsToValues: ({ user }) => ({
        activity_level: user.activity_level || 3,
        weight: user.weight || ""
    }),
    validationSchema: Yup.object().shape({
        activity_level: Yup.number().required("is required"),
        weight: Yup.number().required("is required")
    }),
    handleSubmit: (values, { props, setSubmitting, setErrors, setStatus }) => {
        values.activity_level = values.activity_level.toString();
        axios
            .put("http://localhost:3000/userDetails", values)
            .then(response => {
                props.updateUser({ ...props.user, ...response.data });
            })
            .catch(error => {
                setSubmitting(false);
            });
    }
})(InnerForm);

export default DetailsForm;
