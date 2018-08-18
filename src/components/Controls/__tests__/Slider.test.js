import React from "react";
import { shallow } from "enzyme";
import Slider from "../Slider";
import jest from "jest";

let component;
beforeEach(() => {
    component = shallow(
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
        />
    );
});

test("contains input", () => {
    expect(component.find("input").length).toEqual(1);
});

describe.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])(
    "change to %i",
    number => {
        test("input is changeable", () => {
            component
                .find("input")
                .simulate("change", { target: { value: number } });
            component.update();
            expect(component.find("input").prop("value")).toEqual(number);
        });
    }
);

test("input doesn't change when value props is out of range", () => {
    component.find("input").simulate("change", { target: { value: 120 } });
    component.update();
    expect(component.find("input").prop("value")).toEqual(4);
});
