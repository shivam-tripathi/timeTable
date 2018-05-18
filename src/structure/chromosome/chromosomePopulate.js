import _ from 'lodash';
import {randomGenerator} from '../../utils/random';
import {mapDayToWeekday} from './chromsomeObject';

export const fillLunchSlots = (chromosome, dataObj) => {
	let random = randomGenerator(dataObj.lunchBeginSlot, dataObj.lunchEndSlot);

	return Object.keys(chromosome.lunchSlots).reduce((prev, key) => {
		prev[key] = random();
		return prev;
	}, {});
};

export const checkTokenSlotConstraints = (slot, token, lunchSlots, dataObj) => {
	if (slot.lectures.length >= dataObj.classrooms) return false;
	if (slot.teachers.has(token.teacher)) return false;
	if (slot.batch.has(token.batch)) return false;

	return true;
};

export const checkLabSlotConstraints = (
	dayGene,
	slotBegin,
	token,
	lunchSlots,
	dataObj
) => {
	let batchId = token.batch;
	for (let slotNumber in _.range(slotBegin, slotBegin+dataObj.labSlots+1)) {
		if (slotNumber == lunchSlots[batchId]) return false;
		if (dayGene[slotNumber].labs.length >= dataObj.labrooms) return false;
		if (dayGene[slotNumber].teachers.has(token.teacher)) return false;
		if (dayGene[slotNumber].batch.has(token.batch)) return false;
	}
	return true;
};

export const addLectureTokenToSlot = (slot, token) => {
	slot.teachers.add(token.teacher);
	slot.batch.add(token.batch);
	slot.lectures.push(token);

	console.log(slot, token);

	return slot;
};

export const addLabTokenSlot = (dayGene, slotBegin, token, dataObj) => {
	for (let slotNumber in _.range(slotBegin, slotBegin+dataObj.labSlots+1)) {
		dayGene[slotNumber].teachers.add(token.teacher);
		dayGene[slotNumber].batch.add(token.batch);
		dayGene[slotNumber].labs.push(token);
	}
	return dayGene;
};

export const fillLabs = (chromosome, dataObj) => {
	let randDay = randomGenerator(0, dataObj.workingDays-1);
	let randSlot = randomGenerator(0, dataObj.slots-1);

	let labTokens = dataObj.tokens.filter(obj => obj.slots == 3);

	labTokens.map(labToken => {
		while(true) {
			let day = mapDayToWeekday(dataObj.workingDays, randDay());
			let slotNumber = randSlot();

			let dayGene = chromosome[day];
			let lunchSlots = chromosome.lunchSlots;

			if (!checkLabSlotConstraints(dayGene, slotNumber, labToken, lunchSlots, dataObj))
				continue;

			chromosome[day] = addLabTokenSlot(dayGene, slotNumber, labToken, dataObj);
			break;
		}
	});
	return chromosome;
};

export const fillLectures = (chromosome, dataObj) => {
	let randDay = randomGenerator(0, dataObj.workingDays-1);
	let randSlot = randomGenerator(0, dataObj.slots-1);

	let lectureTokens = dataObj.tokens.filter(obj => obj.slots == 1);

	lectureTokens.map(lectureToken => {
		let lectureCount = dataObj.lectureCount;
		while(lectureCount > 0) {
			let day = mapDayToWeekday(dataObj.workingDays, randDay());
			let slotNumber = randSlot();

			let slot = chromosome[day][slotNumber];
			let lunchSlots = chromosome.lunchSlots;

			if (!checkTokenSlotConstraints(slot, lectureToken, lunchSlots, dataObj))
				continue;

			let slot2 = addLectureTokenToSlot(slot, lectureToken);
			chromosome[day][slotNumber] = slot2;
			lectureCount--;
		}
	});
	console.log('###########', chromosome);
	return chromosome;
};