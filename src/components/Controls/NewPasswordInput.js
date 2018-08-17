import React from "react";
import style from "./NewPasswordInput.scss";
import cs from "classnames";
import zxcvbn from "zxcvbn";
import { Horizontal } from "../Templates/Templates";
import { Label, Input } from "./Inputs";
import { VisibilityIcon } from "../Icons/Icons";
import range from "../../utils/range";

const PasswordStrengthIndicator = ({ value, score, disabled }) => {
    const strengthLevels = [
        "Very Weak ❌",
        "Weak ❌",
        "Medium ✅",
        "Strong ✅",
        "Very Strong 💪✅"
    ];
    const classes = ["very-weak", "weak", "okay", "strong", "very-strong"];
    const strength = strengthLevels[score];
    const indicatorClass = classes[score];

    const renderIndicator = () => {
        return range(0, 5).map(bar => {
            const barClasses = cs(style["bar"], {
                [style[indicatorClass]]: bar <= score,
                [style["plain"]]: bar > score
            });
            return <div key={bar} className={barClasses} />;
        });
    };

    const className = cs(style["hidden"], {
        [style["open"]]: value,
        [style["disabled"]]: disabled
    });

    return (
        <div className={className}>
            <Horizontal style={{ width: "100%" }}>
                <Horizontal
                    style={{
                        width: "60%",
                        padding: "4px 5px",
                        marginTop: "0.4rem"
                    }}
                >
                    {renderIndicator()}
                </Horizontal>
                <span
                    style={{
                        fontSize: ".8rem",
                        paddingLeft: "5px",
                        marginTop: "0.25rem"
                    }}
                >
                    {strength}
                </span>
            </Horizontal>
        </div>
    );
};

const NewPasswordInput = ({
    value,
    disabled,
    visiblePassword,
    setVisiblePassword,
    setScore,
    title,
    ...props
}) => {
    const result = zxcvbn(value.substr(0, 70));
    let score = result.score;
    return (
        <div>
            <Input
                style={{ paddingRight: "2.75rem" }}
                type={visiblePassword ? "text" : "password"}
                name="password"
                value={value}
                disabled={disabled}
                {...props}
            >
                <Label>{title || "Password"}</Label>
                <VisibilityIcon
                    visiblePassword={visiblePassword}
                    setVisiblePassword={setVisiblePassword}
                />
            </Input>

            <PasswordStrengthIndicator
                value={value}
                score={score}
                setScore={setScore}
                disabled={disabled}
            />
        </div>
    );
};

export default NewPasswordInput;
