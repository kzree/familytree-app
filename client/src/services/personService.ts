import { PersonType } from '../types/PersonType';

const basePath = 'http://localhost:8080/api/v1/person';

export function getAll(): Promise<Array<PersonType>> {
    return fetch(basePath + '/all', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function getById(id: string): Promise<PersonType> {
    return fetch(basePath + '/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function getByFamilyId(id: string): Promise<Array<PersonType>> {
    return fetch(basePath + '/family/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
