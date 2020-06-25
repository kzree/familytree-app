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
            <div className="person person--item">
                <div className="person__body">
                    <div className="person__name">{name}</div>
                    <div className="person__gender">{props.gender}</div>
                    <div className="person__age">{age}</div>
                    <div className="person__birthday">{props.birthDate}</div>
                </div>
            </div>
        </Link>
    );
};

export const PersonHeader = () => (
    <div className="person person--header">
        <div className="person__body person__body--header">
            <div className="person__name">Name</div>
            <div className="person__gender">Gender</div>
            <div className="person__age">Age</div>
            <div className="person__birthday">Birthday</div>
        </div>
    </div>
);

export default Person;
