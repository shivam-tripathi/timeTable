/* eslint-disable */

// var genetic = module.exports;

// genetic.Task = require('./genetic/Task')

import {read} from './structure/data';
import {chromosomeObject} from './structure/chromosome/chromsomeObject';
import {fillLunchSlots} from './structure/chromosome/chromosomePopulate';
import {populationObject} from './structure/population/populationObject';
import log from './utils/consoleWrapper';

// log('Time table scheduler', 6);

const POPULATION_SIZE = 10;


let obj = read();
console.log(obj);

let chromosome = chromosomeObject(obj);
chromosome.lunchSlots = fillLunchSlots(chromosome, obj);
console.log(chromosome);

// let population = populationObject(POPULATION_SIZE, obj);
// console.log(population);