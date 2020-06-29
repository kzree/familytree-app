import React from 'react';
import { PersonType } from '../types/PersonType';
import Person from './Person';

interface PeopleTableProps {
    visiblePeople: PersonType[];
}

const PeopleTable = ({ visiblePeople }: PeopleTableProps) => (
    <div className="list-page__table">
        {visiblePeople.map((item, i) => (
            <Person
                key={i}
                id={item.id}
                name={item.name}
                birthDate={item.birthDate}
                deathDate={item.deathDate}
                dead={item.dead}
                gender={item.gender}
                parent1={item.parent1}
                parent2={item.parent2}
                family={item.family}
            />
        ))}
    </div>
);

export default PeopleTable;
