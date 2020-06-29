import React, { useState, useEffect } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll } from '../services/personService';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const PeoplePanel = () => (
    <div className="list-panel">
        <nav className="list-panel__btn">
            <Link to={'/viewall/families'}>
                <Button buttonText="Families" size="small" theme="main" />
            </Link>
        </nav>
        <div className="list-panel__head-wrap">
            <h2 className="list-panel__head">List of all</h2>
        </div>
    </div>
);

export const PeoplePage = () => {
    const [items, setItems] = useState<PersonType[]>([]);

    const fetchAll = async () => {
        window.scrollTo(0, 0);
        await getAll().then((data) => {
            setItems(data);
        });
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="list-page">
            <div className="list-page__content">
                <PeoplePanel />
                <PersonHeader />

                <PeopleTable visiblePeople={items.sort((a, b) => a.name.localeCompare(b.name))} />
            </div>
        </div>
    );
};

export default PeoplePage;
