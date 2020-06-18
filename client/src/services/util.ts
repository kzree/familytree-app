import { PersonType } from '../types/PersonType';
import PersonPageData from '../types/PersonPageData';
import PersonAdditionForm from '../types/PersonAdditionForm';
import PersonAdditonFormOptions from '../types/PersonAdditionFormOptions';

export const calculateAgeByPerson = (person: PersonType) => {
    if (!person.dead) {
        let birthday = +new Date(person.birthDate);
        return ~~((Date.now() - birthday) / 31557600000);
    } else {
        let birthday = +new Date(person.birthDate);
        let deathday = +new Date(person.deathDate);
        return ~~((deathday - birthday) / 31557600000);
    }
};

export const calculateAgeByParams = (birthDate: string, deathDate: string, dead: boolean) => {
    if (!dead) {
        let birthday = +new Date(birthDate);
        return ~~((Date.now() - birthday) / 31557600000);
    } else {
        let birthday = +new Date(birthDate);
        let deathday = +new Date(deathDate);
        return ~~((deathday - birthday) / 31557600000);
    }
};

export const getToday = () => {
    let date = new Date();

    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear();

    if (((month as unknown) as number) < 10) month = '0' + month;
    if (((day as unknown) as number) < 10) day = '0' + day;

    return year + '-' + month + '-' + day;
};

export const createEmptyPerson = () => {
    const person: PersonType = {
        id: '',
        name: '',
        gender: 'male',
        birthDate: '',
        dead: false,
        deathDate: '',
        parent1: '',
        parent2: '',
        family: '',
    };

    return person;
};

export const initPersonPageData = () => {
    const personPageData: PersonPageData = {
        parent1: createEmptyPerson(),
        parent2: createEmptyPerson(),
        children: [],
        siblings: [],
        childNumber: 0,
        relativesAmount: 0,
    };

    return personPageData;
};

export const initPersonFormInput = () => {
    const personFormInput: PersonAdditionForm = {
        name: '',
        gender: '',
        birthDate: '',
        deathDate: '',
        isDead: false,
        familyId: '',
        motherId: '',
        fatherId: '',
    };

    return personFormInput;
};

export const initPersonFormOptions = () => {
    const personFormOptions: PersonAdditonFormOptions = {
        hasMother: false,
        hasFather: false,
        motherQuery: '',
        fatherQuery: '',
        motherAge: 0,
        fatherAge: 0,
        families: [],
        possibleMothers: [],
        possibleFathers: [],
    };

    return personFormOptions;
};
