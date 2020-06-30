import { PersonType } from '../types/PersonType';
import PersonAdditionForm from '../types/PersonAdditionForm';

const basePath = '/api/v1/person/';

export function getPersonFromServer(path: string): Promise<PersonType> {
    return fetch(`${basePath}${path}`, {
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

export function getArrayOfPersonFromServer(path: string): Promise<Array<PersonType>> {
    return fetch(`${basePath}${path}`, {
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

export function addPerson(personToSend: PersonAdditionForm) {
    fetch(basePath, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: personToSend.name,
            gender: personToSend.gender,
            birthDate: personToSend.birthDate,
            dead: personToSend.isDead,
            deathDate: personToSend.deathDate,
            parent1: personToSend.motherId,
            parent2: personToSend.fatherId,
            family: personToSend.familyId,
        }),
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
