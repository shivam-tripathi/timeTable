import {chromosomeObject} from '../chromosome/chromsomeObject';
import {fillLunchSlots, fillLabs, fillLectures} from '../chromosome/chromosomePopulate';
import _ from 'lodash';

export const populationObject = (size, dataObj) => {
	console.log(`

	Initializing the population structure of size ${size}....

	`);

	let population = _.times(size, () => chromosomeObject(dataObj));

	_.range(size).map(index => console.log(`	## Initialzing chromosome ${index}.... Done.`))

	// Initial population
	console.log('\nFilling Lunch slots up for each chromosome... Done.');
	population = population.map((chromosome, index) => {
		chromosome.lunchSlots = fillLunchSlots(chromosome, dataObj);
		return chromosome;
	});

	console.log('Filling Labs slots up for each chromosome... Done.');
	population = population.map(chromosome => fillLabs(chromosome, dataObj));

	console.log('Filling Lectures slots up for each chromosome ... Done.');
	population = population.map(chromosome => fillLectures(chromosome, dataObj));

	return population;
};

export const populationSort = (population) => {
	return population.map((a, b) => {

	});
};