import {WEEKDAYS} from '../../utils/helpers';
import {} from './chromosomePopulate';
import _ from 'lodash';

export const primaryFitness = (chromosome, dataObj) => {

	let reverseBatchesMapping = _.invert(dataObj.batchesMapping);
	let batches = Object.keys(reverseBatchesMapping);

	let reverseTeachersMapping = _.invert(dataObj.teacherMapping);
	let teachers = Object.keys(_.invert(dataObj.teacherMapping));


	let keys = WEEKDAYS.slice(0, dataObj.workingDays);
	let ans = teachers.map(teacher => {
		return keys.map(key => {
			let dist = 0;
			let prev = null;
			console.log('$$$$$$$$$$$$$$$$$$');
			for(let slotNumber in _.range(dataObj.slots)) {
				if (chromosome[key][slotNumber]['teachers'].has(teacher)) {
					if (prev == null) {
						prev = slotNumber;
						continue;
					}

					console.log('prev ', prev, ' pres ', slotNumber, ' dist ', dist);
					dist += (slotNumber - prev);
					prev = slotNumber;
				}
			}
			console.log(dist);
			return dist;
		})
	})

	// console.log(ans);

	// console.log(batchesMapping);
	// keys.map(key => {

	// });
};

export const secondaryFitness = (chromosome, dataObj) => {
	return
};