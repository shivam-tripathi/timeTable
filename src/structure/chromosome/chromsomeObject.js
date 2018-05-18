import _ from 'lodash';
import {WEEKDAYS} from '../../utils/helpers';


export const getSlotConstruct = () => {
	return {
		'teachers': new Set(),
		'batch': new Set(),
		'lectures': [],
		'labs': []
	};
};

export const mapDayToWeekday = (workingDays, day) => {
	return WEEKDAYS.slice(0, workingDays)[day];
};

export const getLunchSlotConstruct = (batchesMapping) => {
	return Object.keys(batchesMapping).reduce((prev, key) => {
		prev[batchesMapping[key]] = null;
		return prev;
	}, {});

	// Alternatively, we can:
	// Object.keys(_.invert(batchesMapping)).reduce(
	// 	(prev, key) => {
	// 		prev[key] =null;
	// 		return prev;
	// 	}, {}
	// );
};

export const getSlots = (slots) => {
	return _.zipObject(
		_.times(slots, _.identity),
		_.times(slots, getSlotConstruct)
	);
};

export const chromosomeObject = (dataObj) => {
	return _.extend(
		_.zipObject(
			WEEKDAYS.slice(0, dataObj.workingDays),
			_.times(dataObj.workingDays, () => getSlots(dataObj.slots))
		),
		{lunchSlots: getLunchSlotConstruct(dataObj.batchesMapping)}
	);
};