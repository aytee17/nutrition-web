import Yup from "yup";

const emailSchema = Yup.string()
    .trim()
    .email("is invalid")
    .required("is required");

export default emailSchema;
