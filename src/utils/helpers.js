import _ from 'lodash';

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