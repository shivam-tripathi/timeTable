import {readFileSync} from 'fs';


/*
    Presently we are pulling in relevant data via a json file.
    It would be great to allow for a form on a page to allow data to fill in all
        the relevant data through a webpage.
*/

let dataFileBasename = 'data';

const _data =
	readFileSync(`${dataFileBasename}.json`);
const data = JSON.parse(_data);

export default data.data;
