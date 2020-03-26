import { PersonType } from '../types/PersonType';

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

export const calculateAgeByParams = (
    birthDate: string,
    deathDate: string,
    dead: boolean
) => {
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
