import {WEEKDAYS} from '../../utils/helpers';
import {mapDayToWeekday} from './chromsomeObject';
import {randomGenerator} from '../../utils/random';
import _ from 'lodash';

export const crossover = (chromosome, dataObj) => {

	console.log('\n\nStarting crossover ....');

	let randDay = randomGenerator(0, dataObj.workingDays-1);
	let randSlot = randomGenerator(0, dataObj.slots-1);

	let dayOne = randDay();
	let dayTwo = randDay();

	let parentDayOne = WEEKDAYS[dayOne];
	let parentDayTwo = WEEKDAYS[dayTwo];

	// Breaking point for crossover
	let breakPoint = randSlot();

	console.log(`Selected parent days for cross overs ... ${parentDayOne} and ${parentDayTwo}`)

	// Convert object to array
	let parentArrayOne = Object.keys(chromosome[parentDayOne]).map((key) => chromosome[parentDayOne][key]);
	let parentArrayTwo = Object.keys(chromosome[parentDayTwo]).map((key) => chromosome[parentDayTwo][key]);

	// Single point crossover for parent arrays
	let childArrayOne = _.concat(parentArrayOne.slice(0, breakPoint), parentArrayTwo.slice(breakPoint, dataObj.slots));
	let childArrayTwo = _.concat(parentArrayTwo.slice(0, breakPoint), parentArrayOne.slice(breakPoint, dataObj.slots));

	return chromosome;
};

export const mutation = (chromosome, dataObj) => {
	let keys = WEEKDAYS.slice(0, dataObj.workingDays);
	let arr = _.times(10, keys);
	keys.map(key => {

	});
};