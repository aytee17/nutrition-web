import keys from "../keys";

describe.each([["UP", 38], ["DOWN", 40], ["ENTER", 13]])(
    "keys.%s === %i",
    (key, value) => {
        test("", () => expect(keys[key]).toEqual(value));
    }
);
