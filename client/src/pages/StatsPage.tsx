import React, { useState, useEffect } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll, getYoungestPerson, getOldestPerson, getYoungestUncle } from '../services/personService';
import { getAll as getAllFamilies } from '../services/familyService';
import { Link } from 'react-router-dom';
import { createEmptyPerson } from '../services/util';

const StatsPage = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [totalPeople, setTotalPeople] = useState<number>(0);
    const [totalFamilies, setTotalFamilies] = useState(0);
    const [youngestPerson, setYoungestPerson] = useState<PersonType>(createEmptyPerson());
    const [oldestPerson, setOldestPerson] = useState<PersonType>(createEmptyPerson());
    const [youngestUncle, setYoungestUncle] = useState<PersonType>(createEmptyPerson());

    const getTotalPeopleAmount = async () => {
        await getAll().then((data) => {
            setTotalPeople(data.length);
        });
    };

    const getTotalFamiliesAmount = async () => {
        await getAllFamilies().then((data) => {
            setTotalFamilies(data.length);
        });
    };

    const getTheYoungestPerson = async () => {
        await getYoungestPerson().then((data) => {
            setYoungestPerson(data);
        });
    };

    const getTheOldestPerson = async () => {
        await getOldestPerson().then((data) => {
            setOldestPerson(data);
        });
    };

    const getTheYoungestUncle = async () => {
        await getYoungestUncle().then((data) => {
            setYoungestUncle(data);
        });
    };

    useEffect(() => {
        const init = () => {
            getTotalPeopleAmount();
            getTotalFamiliesAmount();
            getTheYoungestPerson();
            getTheOldestPerson();
            getTheYoungestUncle();
        };

        if (!loaded) {
            init();
            setLoaded(true);
        }
    }, [loaded]);

    return (
        <div className="people-wrap">
            <div className="people-content-wrap">
                <div className="stats-content">
                    <h1>Statistics</h1>
                    <div className="stats-text">
                        Total amount of people: <Link to={'/viewall'}>{totalPeople}</Link>
                    </div>
                    <div className="stats-text">
                        Total amount of families: <Link to={'/viewall/families'}>{totalFamilies}</Link>
                    </div>
                    <div className="stats-text">
                        Youngest person: <Link to={`/person/${youngestPerson.id}`}>{youngestPerson.name}</Link>
                    </div>
                    <div className="stats-text">
                        Oldest person: <Link to={`/person/${oldestPerson.id}`}>{oldestPerson.name}</Link>
                    </div>
                    <div className="stats-text">
                        Youngest aunt/uncle: <Link to={`/person/${youngestUncle.id}`}>{youngestUncle.name}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;
