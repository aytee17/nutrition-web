import { object, number } from "yup";
import { getMonth, isLeapYear } from "../date";

const dateSchema = object().shape({
    day: number()
        .integer()
        .min(1, "Select a Day")
        .max(31)
        .when(
            "month",
            (month, schema) =>
                month === 9 || month === 4 || month === 6 || month === 11
                    ? schema.max(30, `${getMonth(month)} only has 30 days`)
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
        )
        .required("Select a Day"),
    month: number()
        .integer()
        .min(1, "Select a Month")
        .max(12)
        .required("Select a Month"),
    year: number()
        .integer()
        .min(1905, "Select a Year")
        .max(new Date().getFullYear() - 13, "You must be over 13 to register.")
        .required("Select a Year")
});

export default dateSchema;
