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
                    <span className="person__name">{dead ? `✝${name}` : name}</span>
                    <span className="person__gender">{gender}</span>
                    <span className="person__age">{age}</span>
                    <span className="person__birthday">{birthDate}</span>
                </div>
            </div>
        </Link>
    );
};

export const PersonHeader = () => (
    <div className="person person--header">
        <div className="person__body person__body--header">
            <span className="person__name">Name</span>
            <span className="person__gender">Gender</span>
            <span className="person__age">Age</span>
            <span className="person__birthday">Birthday</span>
        </div>
    </div>
);

export default Person;
