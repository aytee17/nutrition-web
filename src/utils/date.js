export const isLeapYear = year => {
    if (year % 4 === 0) {
        if (year % 100 !== 0) return true;
        if (year % 400 === 0) return true;
        return false;
    }
    return false;
};

export const getMonth = number => {
    return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ][number - 1];
};
