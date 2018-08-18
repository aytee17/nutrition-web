import range from "../range";

describe.each([
    [0, 1, [0]],
    [1, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [1, 2, [1]],
    [7, 11, [7, 8, 9, 10]],
    [-7, 7, [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]]
])("range(%i, %i) => %o", (start, stop, array) =>
    test("generates correct array", () =>
        expect(range(start, stop)).toEqual(array))
);
