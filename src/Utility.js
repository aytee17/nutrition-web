import axios from "axios";
axios.defaults.withCredentials = true;
export const http = axios.create({
	baseURL: "http://localhost:3000/"
});

export const range = (start, stop, step = 1) =>
	Array((stop - start) / step)
		.fill(start)
		.map((x, y) => x + y * step);

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
		"Febuary",
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

export const keys = {
	UP: 38,
	DOWN: 40,
	ENTER: 13
}

// Basal Metabolic Rate
const bmrTable = {
	M: [[74, 2754], [63, 2896], [48, 3653], [49, 2459]],
	F: [[56, 2898], [62, 2036], [34, 3538], [38, 2755]]
};
const activityLevels = range(12, 25, 1).map(x => x/10);

// Estimated Energy Requirement
export const EER = (gender, age, weight, activity_level) => {
	let ageRange;
	if (age >= 13 && age < 18) {
		ageRange = 0;
	} else if (age >= 18 && age < 30) {
		ageRange = 1;
	} else if (age >= 30 && age < 60) {
		ageRange = 2;
	} else {
		ageRange = 3;
	}

	const [ a, b ] = bmrTable[gender][ageRange];
	return Math.floor((a* parseInt(weight) + b)*activityLevels[activity_level]);
};

const proteinTable = {
	M: [14, 20, 40, 65, 64, 81],
	F: [14, 20, 35, 45, 46, 57]
}

export const proteinRequirement = (gender, age) => {
	let ageRange;
	if (age >= 1 && age <=3) {
		ageRange = 0;
	} else if (age >= 4 && age <= 8) {
		ageRange = 1;
	} else if (age >= 9 && age <= 13) {
		ageRange = 2;
	} else if (age >= 14 && age <= 18) {
		ageRange = 3;
	} else if (age >= 19 && age <= 70 ) {
		ageRange = 4;
	} else {
		ageRange = 5;
	}
	return proteinTable[gender][ageRange];
}

const dietaryFiberTable = {
	M: [14, 18, 24, 28, 30],
	F: [14, 18, 20, 22, 25]
}

export const dietaryFiberRequirement = (gender, age) => {
	let ageRange;
	if (age >= 1 && age <=3) {
		ageRange = 0;
	} else if (age >= 4 && age <= 8) {
		ageRange = 1;
	} else if (age >= 9 && age <= 13) {
		ageRange = 2;
	} else if (age >= 14 && age <= 18) {
		ageRange = 3;
	} else {
		ageRange = 4;
	}
	return dietaryFiberTable[gender][ageRange];
}

