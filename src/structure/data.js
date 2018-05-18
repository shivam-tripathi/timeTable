import {extractField, mapNamesToIndexes, hhmmTimeRange,
	hhmmToMinutes, hhmmToSlots, zipObjectFields} from '../utils/helpers';
import data from '../utils/readData';
import _ from 'lodash';

const mapTeacherSubjectBatch = (obj) => {
	return data.class.map(relation => {
		return _.zipObject(
			['teacher', 'subject', 'batch', 'slots'],
			[
				obj.teacherMapping[relation.teacher],
				obj.subjectsMapping[`${relation.subject}:${relation.subjectType}`],
				obj.batchesMapping[`${relation.batch}:${relation.year}`],
				obj[`${relation.subjectType}Slots`]
			]
		);
	});
};

export const read = () => {
	let obj = {};

	obj.duration = hhmmTimeRange(data.time.classBeginTime, data.time.classEndTime);

	obj.slotDuration = hhmmToMinutes(data.time.periodLength);
	obj.slots = obj.duration / obj.slotDuration;

	obj.lunchBeginSlot = Math.ceil(hhmmTimeRange(
		data.time.classBeginTime, data.time.lunchBeginTime
	) / obj.slotDuration);

	obj.lunchEndSlot = Math.floor(hhmmTimeRange(
		data.time.classBeginTime, data.time.lunchEndTime
	) / obj.slotDuration);

	obj.labSlots = hhmmToSlots(data.time.labDuration, obj.slotDuration);
	obj.lectureSlots = 1;
	obj.workingDays = data.time.workingDays;

	obj.classrooms = data.rooms.classrooms;
	obj.labrooms = data.rooms.labrooms;

	obj.lectureCount = data.count.lecture;
	obj.labCount = data.count.lab;

	obj.teachers = new Set(extractField(data.class, 'teacher'));
	obj.subjects = new Set(zipObjectFields(data.class,
		['subject', 'subjectType']).map(val => val.join(':')
	));
	obj.batches = new Set(zipObjectFields(data.class,
		['batch', 'year']).map(val => val.join(':')
	));

	obj.teacherMapping = mapNamesToIndexes(Array.from(obj.teachers));
	obj.subjectsMapping = mapNamesToIndexes(Array.from(obj.subjects));
	obj.batchesMapping = mapNamesToIndexes(Array.from(obj.batches));

	obj.classrooms = data.rooms.classrooms;
	obj.labs = data.rooms.labs;

	obj.tokens = mapTeacherSubjectBatch(obj);

	return obj;
};
