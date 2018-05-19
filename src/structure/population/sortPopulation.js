import {fitness} from '../chromosome/fitness';

export const populationSort = (population, dataObj) => {
	return population.sort((a, b) => {
		let fitnessA = fitness(a, dataObj);
		let fitnessB = fitness(b, dataObj);
		if (fitnessA[0] > fitnessB[0]) return 1;
		if (fitnessA[0] < fitnessB[0]) return -1;
		if (fitnessA[0] == fitnessB[0]) {
			if (fitnessA[1] > fitnessB[1]) return 1;
			if (fitnessA[1] < fitnessB[1]) return -1;
		}
		return 1;
	});
};
