import _ from 'lodash';

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const mapNamesToIndexes = (names) => {
	return names.reduce(
		(pres, name, index) => {pres[name] = index; return pres;},
		{}
	);
};

export const crossMapArray = (mapping, indexKeys, indexValues) => {
	return mapping.reduce(
		(pres, {key, value}) => {
			pres[indexKeys[key]] = indexValues[value];
			return pres;
		},
		{}
	);
};

export const hhmmToMinutes = (time) => {
	let hhmm = time.split(':');
	return ((+hhmm[0])*60 + (+hhmm[1]));
};

export const hhmmToSlots = (time, slotLength) => {
	return hhmmToMinutes(time) / slotLength;
};

export const extractField = (obj, field) => {
	return obj.map(val => val[field]);
};

export const zipArraysToObject = (keys, ...arr) => {
	return _.zip(...arr).map(zipped => _.zipObject(keys, zipped));
};

export const zipObjectFields = (obj, fields) => {
	return fields.map(field =>
		extractField(obj, field)).reduce((pres, prev) => _.zip(pres, prev));
};

export const hhmmTimeRange = (begin, end) => {
	return hhmmToMinutes(end) - hhmmToMinutes(begin);
};

export const add2D = (arr2) => {
	return _.sum(arr2.map(arr => _.sum(arr)));
};

export const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
	}
	return array;
}