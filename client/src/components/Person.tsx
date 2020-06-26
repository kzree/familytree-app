import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PersonInterface } from '../types/PersonType';
import { calculateAgeByParams } from '../services/util';

const Person = ({ id, name, gender, dead, birthDate, deathDate }: PersonInterface) => {
    const [age, setAge] = useState(0);

    useEffect(() => {
        setAge(calculateAgeByParams(birthDate, deathDate, dead));
    }, [birthDate, dead, deathDate]);

    return (
        <Link to={`/person/${id}`}>
            <div className="person person--item">
                <div className="person__body">
                    <div className="person__name">{dead ? `✝${name}` : name}</div>
                    <div className="person__gender">{gender}</div>
                    <div className="person__age">{age}</div>
                    <div className="person__birthday">{birthDate}</div>
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
