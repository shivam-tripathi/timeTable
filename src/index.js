/* eslint-disable */

import {read} from './structure/data';
import {chromosomeObject} from './structure/chromosome/chromsomeObject';
import {fillLabs, fillLectures, fillLunchSlots} from './structure/chromosome/chromosomePopulate';
import {populationObject} from './structure/population/populationObject';
import log from './utils/consoleWrapper';
import util from 'util';
import {prettyPrintChromosome} from './utils/prettyPrint';
import fs from 'fs';
// import {Task} from './genetic/task';

const POPULATION_SIZE = 10;

let obj = read();
fs.writeFileSync('dataObject.json', JSON.stringify(obj, null, 4));

let chromosome = chromosomeObject(obj);
chromosome.lunchSlots = fillLunchSlots(chromosome, obj);
chromosome = fillLabs(chromosome, obj);
chromosome = fillLectures(chromosome, obj);
// console.log(util.inspect(chromosome, false, null));
fs.writeFileSync('out.json', JSON.stringify(prettyPrintChromosome(chromosome, obj), null, 4));

// let population = populationObject(POPULATION_SIZE, obj);
// console.log(population);