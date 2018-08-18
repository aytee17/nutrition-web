import { isLeapYear, getMonth } from "../date";

describe.each([
    [1, "January"],
    [2, "February"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"]
])("getMonth(%i)", (number, month) => {
    test(`${number} => ${month}`, () =>
        expect(getMonth(number)).toEqual(month));
});

describe.each([1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020])(
    "isLeapYear(%i)",
    year => {
        test(`${year} is a leap year`, () =>
            expect(isLeapYear(year)).toEqual(true));

        describe.each([1, 2, 3])("and", i => {
            const nonLeapYear = year + i;
            test(`${nonLeapYear} is not a leap year`, () => {
                expect(isLeapYear(nonLeapYear)).toEqual(false);
            });
        });
    }
);
