import { PersonType } from '../types/PersonType';

const basePath = 'https://blooming-ocean-33098.herokuapp.com/api/v1/person';

export function getAll(): Promise<Array<PersonType>> {
    return fetch(basePath + '/all', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function getById(id: string): Promise<PersonType> {
    return fetch(basePath + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function getByFamilyId(id: string): Promise<Array<PersonType>> {
    return fetch(basePath + '/family/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function getChildren(id: string): Promise<Array<PersonType>> {
    return fetch(basePath + '/child/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function getSiblings(id: string): Promise<Array<PersonType>> {
    return fetch(basePath + '/sibling/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function searchPeopleByQuery(searchQuery: string): Promise<Array<PersonType>> {
    return fetch(basePath + '/search/' + searchQuery, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export async function addPerson(
    name: string,
    gender: string,
    bday: string,
    dead: boolean,
    dday: string,
    family: string,
    mother: string,
    father: string
) {
    await fetch(basePath, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            gender: gender,
            birthDate: bday,
            dead: dead,
            deathDate: dday,
            parent1: mother,
            parent2: father,
            family: family,
        }),
    });
}

export async function getYoungestPerson(): Promise<PersonType> {
    return fetch(basePath + '/youngest', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export async function getOldestPerson(): Promise<PersonType> {
    return fetch(basePath + '/oldest', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export async function getYoungestUncle(): Promise<PersonType> {
    return fetch(basePath + '/youngest/uncle', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function deleteById(id: string) {
    return fetch(basePath + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
