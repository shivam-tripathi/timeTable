import * as helpers from '../../lib/utils/helpers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';


chai.use(chaiAsPromised);
const {expect} = chai;

let dataObjArr = [
	{ one: 1, two: 2, three: 3 },
	{ one: 2, two: 4, three: 6 },
	{ one: 3, two: 6, three: 9 }
];

describe('Test Utils Helper Functions', () => {

	it('Should extract correct field values', () => {
		const result = helpers.extractField(dataObjArr, 'two');
		expect(result).to.eql([2, 4, 6]);
	});

	it('Should correctly zip object fields', () => {
		const result = helpers.zipObjectFields(dataObjArr, ['one', 'three']);
		expect(result).to.eql([[1, 3], [2, 6], [3, 9]]);
	});

	it('Should convert hh:mm to correct minutes value', () => {
		expect(helpers.hhmmToMinutes('02:25')).to.equal(145);
		expect(helpers.hhmmToMinutes('2:50')).to.equal(170);
	});

	it('Should divide into correct slots', () => {
		expect(helpers.hhmmToSlots('03:20', 50)).to.equal(4);
	});
})
