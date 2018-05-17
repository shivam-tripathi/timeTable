/* eslint-disable */
import async from 'async';
import {EventEmitter} from 'events';

class Task {
	constructor(config) {
		this.generation = 0;
		this.popSize = config.popSize || 10;
		this.stopCriteria = config.stopCriteria;
		this.crossover = config.crossover;
		this.mutate = config.mutate;

		this.protoype = new EventEmitter();
	}
}