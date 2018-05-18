import {WEEKDAYS} from './helpers';
import _ from 'lodash';

export const reverseMap = (obj, arr) => {
	return arr.map(key => obj[key]);
};

export const mapTokenToValues = (token, dataObj) => {
	let teacherMapping = _.invert(dataObj.teacherMapping);
	let subjectMapping = _.invert(dataObj.subjectsMapping);
	let batchesMapping = _.invert(dataObj.batchesMapping);
	return {
		'teacher': teacherMapping[token.teacher],
		'subject': subjectMapping[token.subject],
		'batch': batchesMapping[token.batch],
		'type': (token.slots == 1) ? 'lecture' : ((token.slots == 3) ? 'labs' : null)
	}
};

export const prettyPrintChromosome = (chromosome, dataObj) => {
	let keys = WEEKDAYS.slice(0, dataObj.workingDays);
	let prettyPrinted = {};

	keys.map(key => {
		prettyPrinted[key] = {};
		for (let slot in _.range(0, dataObj.slots)) {

			let _slot = `Slot number ${slot}`;
			prettyPrinted[key][_slot] = {};

			prettyPrinted[key][_slot]['Teachers active in this slot'] =
				reverseMap(
					_.invert(dataObj.teacherMapping),
					Array.from(chromosome[key][slot]['teachers'])
				);

			prettyPrinted[key][_slot]['Batches active in this slot'] =
				reverseMap(
					_.invert(dataObj.batchesMapping),
					Array.from(chromosome[key][slot]['batch'])
				);

			prettyPrinted[key][_slot]['Lectures classes in this slot'] =
				chromosome[key][slot].lectures.map(token => mapTokenToValues(token, dataObj));


			prettyPrinted[key][_slot]['Labs in this slot'] =
				chromosome[key][slot].labs.map(token => mapTokenToValues(token, dataObj));
		}
	})
	return prettyPrinted;
};