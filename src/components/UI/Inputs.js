import React from "react";
import style from "./Inputs.scss";
import cs from "classnames";

export const InputList = ({ children, ...props }) => (
    <div className={style["input-list"]} {...props}>
        {children}
    </div>
);

export const Input = ({
    children,
    icon,
    invalid,
    errorMessage,
    number,
    noLabel,
    noUnits,
    noEmoji,
    ...props
}) => {
    const className = cs({
        [style["input-with-icon"]]: icon,
        [style["input"]]: !icon,
        [style["invalid"]]: invalid,
        [style["number"]]: number,
        [style["no-units"]]: number && noUnits,
        [style["no-label"]]: noLabel,
        [style["no-emoji"]]: noEmoji
    });
    return (
        <div className={style["input-container"]}>
            <input className={className} required {...props} />
            {React.Children.map(children, child =>
                React.cloneElement(child, { invalid, errorMessage })
            )}
        </div>
    );
};

export const FixedDisplay = ({ title, content }) => (
    <div className={style["fixed-info"]}>
        <div className={style["fixed-label"]}>{title}</div>
        <div className={style["fixed-content"]}>{content}</div>
    </div>
);

export const Label = ({ icon, children, invalid, errorMessage, ...props }) => {
    const className = cs(style["floating-label"], {
        [style["with-icon"]]: icon,
        [style["invalid"]]: invalid
    });
    return (
        <label className={className} {...props}>
            {children} {invalid && errorMessage}
        </label>
    );
};

export const SmallLabel = ({ children, errorMessage, ...props }) => (
    <label className={style["small-label"]} {...props}>
        {children}
    </label>
);

export const Button = ({ children, pressed, greyed, ...props }) => {
    const className = cs(style["button"], {
        [style["pressed"]]: pressed,
        [style["greyed"]]: greyed
    });

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const ButtonTitle = ({ isSubmitting, children }) => {
    return (
        <div className={style["button-title"]}>
            {!isSubmitting ? children : <LoadingSpinner />}
        </div>
    );
};

export const Select = ({ children, invalid, ...props }) => {
    const className = cs(style["select"], {
        [style["invalid"]]: invalid
    });
    return (
        <select className={className} {...props}>
            {children}
        </select>
    );
};

export const Radio = ({ id, label, ...props }) => {
    const className = cs({
        [style["selected-radio"]]: props.checked
    });
    return (
        <div style={{ padding: "0.25rem" }}>
            <input
                style={{ margin: "0.3125rem", marginRight: "0.4rem" }}
                type="radio"
                id={id}
                {...props}
            />
            <label className={className} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};
