import * as t from 'io-ts';

import { reporter } from '../src';

const Gender = t.union([t.literal('Male'), t.literal('Female')]);
const Person = t.interface({
    name: t.string,
    age: t.number,
    gender: Gender,
    // children: t.array(t.recursion('Person', Person)),
    children: t.array(
        t.interface({
            gender: Gender,
        }),
    ),
});
type IPerson = t.TypeOf<typeof Person>;

const logAndReport = (value: t.Validation<{}>) => {
    console.log({
        value,
        reporterResult: reporter(value),
    });
};

const person1: IPerson = {
    name: 'Giulio',
    age: 43,
    gender: 'Male',
    children: [{ gender: 'Female' }],
};
logAndReport(t.validate(person1, Person));

const person2: {} = {
    name: 'Giulio',
    children: [{ gender: 'Whatever' }],
};
logAndReport(t.validate(person2, Person));

const NumberGroups = t.array(t.array(t.number));

logAndReport(t.validate({}, NumberGroups));
logAndReport(t.validate([[{}]], NumberGroups));
