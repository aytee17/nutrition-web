import React from "react";
import style from "./Meter.scss";

export default function Meter({
    title,
    amount,
    total,
    units,
    color,
    displayValue = value => `${value}%`
}) {
    const percentage = Math.round((amount / total) * 100);
    const formattedAmount = Number(Math.round(amount)).toLocaleString();
    const formattedTotal = Number(total).toLocaleString();

    const display = value => displayValue(value) || `${value}%`;

    return (
        <div className={style["bar"]}>
            <div className={style["first"]}>
                <div className={style["title"]}>{title}</div>
                <div className={style["percentage"]}>{display(percentage)}</div>
            </div>

            <div className={style["second"]}>
                <div className={style["info"]}>
                    <div className={style["fraction"]}>
                        {formattedAmount}
                        <span className={style["total"]}>
                            {` / ${formattedTotal}`}
                        </span>{" "}
                        {units}
                    </div>
                </div>

                <svg height="12px" width="192px">
                    <rect
                        ry="4px"
                        rx="4px"
                        width="100%"
                        height="12px"
                        fill="#eaeaea"
                    />
                    <rect
                        ry="4px"
                        rx="4px"
                        style={{
                            transition: "0.2s ease-in",
                            width: `${percentage > 100 ? 100 : percentage}%`
                        }}
                        width={`${percentage > 100 ? 100 : percentage}%`}
                        height="12px"
                        fill={color}
                    />
                </svg>
            </div>
        </div>
    );
}
