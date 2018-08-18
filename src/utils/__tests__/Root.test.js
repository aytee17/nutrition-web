import root from "../Root";

describe("Root element", () => {
    test("is a div", () => expect(root.tagName).toEqual("DIV"));
    test("id == root", () => expect(root.id).toEqual("root"));
    test("height == 100%", () => expect(root.style.height).toEqual("100%"));
});
