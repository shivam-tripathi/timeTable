import _ from 'lodash';
import {randomGenerator} from '../../utils/random';

export const fillLunchSlots = (chromosome, dataObj) => {
	let random = randomGenerator(dataObj.lunchBeginSlot, dataObj.lunchEndSlot);

	return Object.keys(chromosome.lunchSlots).reduce((prev, key) => {
		prev[key] = random();
		return prev;
	}, {});
};

// export const fillLabs = (chromosome, dataObj) => {
// };