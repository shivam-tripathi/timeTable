import {WEEKDAYS, add2D} from '../../utils/helpers';
import {} from './chromosomePopulate';
import _ from 'lodash';

export const fitness = (chromosome, dataObj) => {

	let batches = Object.keys(_.invert(dataObj.batchesMapping));
	let teachers = Object.keys(_.invert(dataObj.teacherMapping));


	let keys = WEEKDAYS.slice(0, dataObj.workingDays);
	let teacherDistance = teachers.map(teacher => {
		return keys.map(key => {
			let dist = 0;
			let prev = null;
			for(let slotNumber in _.range(dataObj.slots)) {
				if (chromosome[key][slotNumber]['teachers'].has(parseInt(teacher))) {
					if (prev == null) {
						prev = slotNumber;
						continue;
					}
					dist += (slotNumber - prev);
					prev = slotNumber;
				}
			}
			return dist;
		});
	});


	let batchDistance = batches.map(batch => {
		return keys.map(key => {
			let dist = 0;
			let prev = null;
			for(let slotNumber in _.range(dataObj.slots)) {
				if (chromosome[key][slotNumber]['batch'].has(parseInt(batch))) {
					if (prev == null) {
						prev = slotNumber;
						continue;
					}
					dist += (slotNumber - prev);
					prev = slotNumber;
				}
			}
			return dist;
		});
	});

	// eslint-disable-next-line no-use-before-define
	console.log(`
	Primary fitness values:
	${add2D(teacherDistance)}`);
	console.log(`
	Secondary fitness values:
	${add2D(batchDistance)}
	`);

	return [add2D(teacherDistance), add2D(batchDistance)];
};
