import {WEEKDAYS} from './helpers';
import _ from 'lodash';

export const reverseMap = (obj, arr) => {
	return arr.map(key => obj[key]);
};

export const mapTokenToValues = (token, dataObj) => {
	if (token == null) return token;
	let teacherMapping = _.invert(dataObj.teacherMapping);
	let subjectMapping = _.invert(dataObj.subjectsMapping);
	let batchesMapping = _.invert(dataObj.batchesMapping);
	return {
		'teacher': teacherMapping[token.teacher],
		'subject': subjectMapping[token.subject],
		'batch': batchesMapping[token.batch],
		'type': (token.slots == 1) ? 'lecture' : ((token.slots == 3) ? 'labs' : null)
	};
};

export const prettyPrintChromosome = (chromosome, dataObj) => {
	let keys = WEEKDAYS.slice(0, dataObj.workingDays);
	let prettyPrinted = {};

	keys.map(key => {
		prettyPrinted[key] = {};
		for (let slot in _.range(0, dataObj.slots)) {

			let _slot = `Slot number ${slot}`;
			prettyPrinted[key][_slot] = {};

			prettyPrinted[key][_slot]['Teachers active in this slot'] =
				reverseMap(
					_.invert(dataObj.teacherMapping),
					Array.from(chromosome[key][slot]['teachers'])
				);

			prettyPrinted[key][_slot]['Batches active in this slot'] =
				reverseMap(
					_.invert(dataObj.batchesMapping),
					Array.from(chromosome[key][slot]['batch'])
				);

			prettyPrinted[key][_slot]['Lectures classes in this slot'] =
				chromosome[key][slot].lectures.map(token => mapTokenToValues(token, dataObj));


			prettyPrinted[key][_slot]['Labs in this slot'] =
				chromosome[key][slot].labs.map(token => mapTokenToValues(token, dataObj));
		}
	});
	return prettyPrinted;
};

export const prettyPrintDataObject = (dataObj) => {
	['teachers', 'subjects', 'batches'].map(key => {
		dataObj[key] = Array.from(dataObj[key]);
	});
	return dataObj;
};

// export const constructResultObject = (dataObj) => {
// 	WEEKDAYS.slice(0, objData.workingDays).reduce((prev, pres) => )
// };

export const template = (insert) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.32.1/react-bootstrap.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
        let Table = ReactBootstrap.Table;
        let Grid = ReactBootstrap.Grid;
        ReactDOM.render(
            ${insert},
            document.getElementById('root')
        );
    </script>
  </body>
</html>
`;

export const getResultsBySubject = (subjectId, dataObj) => {
	let x =
		<Grid style={{margin: '50px'}}>
			<Table striped bordered condensed hover>
				<thead>
					<tr>
						<th>Slots</th>
						{WEEKDAYS.slice(0, dataObj.workingDays).map(day =>
							<th>{day}</th>
						)}
					</tr>
				</thead>
				<tbody>

				</tbody>
			</Table>
		</Grid>
}

const findInToken = (objArr, key, value) => {
	return objArr.reduce((prev, obj) => {
		if (obj[key] == value) return obj;
		return prev;
	}, null);
};


export const extractScheduleByBatch = (chromosome, dataObj) => {
	let batches = Object.keys(_.invert(dataObj.batchesMapping));
	let keys = WEEKDAYS.slice(0, dataObj.workingDays);

	return batches.map(batch => {
		return keys.map(key => {
			let slotSchedule = [];
			for(let slotNumber in _.range(dataObj.slots)) {
				let batchId = parseInt(batch);
				slotSchedule.push(
					mapTokenToValues(
						findInToken(chromosome[key][slotNumber]['lectures'], 'batch', batchId) ||
						findInToken(chromosome[key][slotNumber]['labs'], 'batch', batchId) ||
						null, dataObj
					)
				);
			}
			return slotSchedule;
		});
	});
};