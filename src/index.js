/* eslint-disable */

import {read} from './structure/data';
import {chromosomeObject} from './structure/chromosome/chromsomeObject';
import {primaryFitness} from './structure/chromosome/fitness';
import {fillLabs, fillLectures, fillLunchSlots} from './structure/chromosome/chromosomePopulate';
import {populationObject} from './structure/population/populationObject';
import log from './utils/consoleWrapper';
import util from 'util';
import {prettyPrintChromosome, prettyPrintDataObject} from './utils/prettyPrint';
import fs from 'fs';
// import {Task} from './genetic/task';

const POPULATION_SIZE = 10;

// Extract data and compute generic common object
let dataObj = read();
fs.writeFileSync('output/dataObject.json', JSON.stringify(prettyPrintDataObject(dataObj), null, 4));

let population = populationObject(POPULATION_SIZE, dataObj);

// Print single initial example of generated chromosome.
fs.writeFileSync('output/rawChromosome.json', JSON.stringify(population[0], null, 4));
fs.writeFileSync('output/chromosome.json', JSON.stringify(prettyPrintChromosome(population[0], dataObj), null, 4));

primaryFitness(population[0], dataObj);
