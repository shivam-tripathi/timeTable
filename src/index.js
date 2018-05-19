/* eslint-disable */

import {read} from './structure/data';
import {chromosomeObject} from './structure/chromosome/chromsomeObject';
import {fitness} from './structure/chromosome/fitness';
import {crossover, mutation} from './structure/chromosome/crossover';
import {fillLabs, fillLectures, fillLunchSlots} from './structure/chromosome/chromosomePopulate';
import {populationObject} from './structure/population/populationObject';
import {populationSort} from './structure/population/sortPopulation';
import log from './utils/consoleWrapper';
import shuffleArray from './utils/helpers';
import util from 'util';
import {prettyPrintChromosome, prettyPrintDataObject, extractScheduleByBatch} from './utils/prettyPrint';
import fs from 'fs';
import _ from 'lodash';

import json2csv from 'json2csv';

let Json2csvParser = json2csv.Parser;


const POPULATION_SIZE = 10;

// log('Time table Scheduler', 4);

// Extract data and compute generic common object
let dataObj = read();
// fs.writeFileSync('output/dataObject.json', JSON.stringify(prettyPrintDataObject(dataObj), null, 4));

let population = populationObject(POPULATION_SIZE, dataObj);

// let iterations = 50;
// while (iterations > 0) {
//     console.info(`Iterating ${iterations}`);
//     population = _.concat(population, population.map(chromosome => crossover(chromosome, dataObj)));
//     populationSort(population, dataObj);
//     // shuffleArray(population);
//     mutation(population, dataObj);
//     population = population.slice(0, POPULATION_SIZE+1);
//     iterations--;
// }

// console.log(population[0]);
// console.log(extractScheduleByBatch(population[0], dataObj).length);

let schedulerByBatch = extractScheduleByBatch(population[0], dataObj);
console.log(JSON.stringify(schedulerByBatch, null, 4));

schedulerByBatch.map((schedule, index) => {
    fs.writeFileSync(`output/batchWise/${index}.json`, JSON.stringify(schedule, null, 4));
});

// Print single initial example of generated chromosome.
// fs.writeFileSync('output/rawChromosome2.json', JSON.stringify(population[0], null, 4));
// fs.writeFileSync('output/chromosome2.json', JSON.stringify(prettyPrintChromosome(population[0], dataObj), null, 4));

