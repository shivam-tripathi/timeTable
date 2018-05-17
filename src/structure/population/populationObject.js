import {chromosomeObject} from '../chromosome/chromsomeObject';
import _ from 'lodash';

export const populationObject = (size, dataObj) => {
	return _.times(size, () => chromosomeObject(dataObj));
};