import {WEEKDAYS} from '../../utils/helpers';

const prettyPrintChromosome = (chromosome, dataObj) => {
    let keys = WEEKDAYS.slice(0, dataObj.workingDays);

    let prettyPrinted = {};

    for(key in keys) {
        prettyPrinted[key] = {};
        for (slot in _.range(0, dataObj.slots)) {

        }
    }
}