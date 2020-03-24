import React from 'react';
import { PersonType } from '../types/PersonType';
import Person from './Person';

const PeopleTable = (props: { visiblePeople: PersonType[] }) => {
    return (
        <>
            {props.visiblePeople.map((item, i) => {
                return (
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
                );
            })}
        </>
    );
};

export default PeopleTable;
