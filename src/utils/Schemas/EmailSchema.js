import { string } from "yup";

const emailSchema = string()
    .trim()
    .email("is invalid")
    .required("is required");

export default emailSchema;
