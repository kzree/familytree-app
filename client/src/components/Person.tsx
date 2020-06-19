import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PersonInterface } from '../types/PersonType';
import { calculateAgeByParams } from '../services/util';

const Person = (props: PersonInterface) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    useEffect(() => {
        const checkIfDead = () => {
            if (props.dead) {
                return '✝' + props.name;
            } else {
                return props.name;
            }
        };
        setId(props.id);
        setName(checkIfDead());
        setAge(calculateAgeByParams(props.birthDate, props.deathDate, props.dead));
    }, [props.birthDate, props.dead, props.deathDate, props.id, props.name]);

    return (
        <Link to={`/person/${id}`}>
            <div className="person-wrap">
                <div className="person-body">
                    <div className="person-body-name">{name}</div>
                    <div className="person-body-gender">{props.gender}</div>
                    <div className="person-body-age">{age}</div>
                    <div className="person-body-birthday">{props.birthDate}</div>
                </div>
            </div>
        </Link>
    );
};

export const PersonHeader = () => (
    <div className="person-head-wrap">
        <div className="person-head-body">
            <div className="person-body-name">Name</div>
            <div className="person-body-gender">Gender</div>
            <div className="person-body-age">Age</div>
            <div className="person-body-birthday">Birthday</div>
        </div>
    </div>
);

export default Person;
