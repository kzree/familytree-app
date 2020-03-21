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
