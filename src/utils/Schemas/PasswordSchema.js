import Yup from "yup";
import zxcvbn from "zxcvbn";

const passwordSchema = Yup.string()
    .required("is required")
    .test(
        "is-strong-enough",
        "must be at least medium strength (3 bars)",
        password => password && zxcvbn(password).score >= 2
    );

export default passwordSchema;
