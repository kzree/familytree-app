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
        gender: 'male',
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

export const checkForErrors = (personFormInput: PersonAdditionForm, personFormOptions: PersonAdditonFormOptions) => {
    const errors = [];
    // Start error checking
    const name = personFormInput.name.replace(/ +(?= )/g, '');
    if (name.length === 0 || name === ' ') {
        errors.push(0); // Error == Name cannot be empty
    }
    // Parent check
    let age = calculateAgeByParams(personFormInput.birthDate, personFormInput.deathDate, personFormInput.isDead);
    // Check birthdate
    if (new Date(personFormInput.birthDate) > new Date(getToday())) {
        errors.push(1); // Error == Birthdate can not be bigger than the date today
    }
    if (personFormInput.birthDate === '') {
        errors.push(2);
    }
    // Check deathdate
    if (personFormInput.isDead) {
        if (new Date(personFormInput.birthDate) > new Date(personFormInput.deathDate)) {
            errors.push(3); // Error == Deathdate can not be bigger than the birthdate
        }
        if (new Date(personFormInput.deathDate) > new Date(getToday())) {
            errors.push(4); // Error == Deathdate can not be bigger than the date today
        }
        if (personFormInput.deathDate === '') {
            errors.push(5);
        }
    }
    // Check mother
    if (personFormOptions.hasMother) {
        if (personFormInput.motherId === '') {
            errors.push(6); // Error == Mother cannot be empty
        } else {
            if (age >= personFormOptions.motherAge) {
                errors.push(7); // Error == Parent cannot be younger than child
            }
        }
    }
    // Check father
    if (personFormOptions.hasFather) {
        if (personFormInput.fatherId === '') {
            errors.push(8); // Error == Father cannot be empty
        } else {
            if (age >= personFormOptions.fatherAge) {
                errors.push(9); // Error == Parent cannot be younger than child
            }
        }
    }

    return errors;
};

export const cleanFormPerson = (personToSend: PersonAdditionForm) => {
    personToSend.birthDate = personToSend.birthDate.replace(/-/g, '/');
    if (personToSend.isDead) {
        personToSend.deathDate = personToSend.deathDate.replace(/-/g, '/');
    } else {
        personToSend.deathDate = null;
    }
    if (!personToSend.motherId) {
        personToSend.motherId = null;
    }
    if (!personToSend.fatherId) {
        personToSend.fatherId = null;
    }
};
