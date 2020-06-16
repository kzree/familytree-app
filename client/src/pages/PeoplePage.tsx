import React, { useState, useEffect } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll } from '../services/personService';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { ButtonSmall } from '../components/Button';
import { Link } from 'react-router-dom';

const PeoplePanel = () => {
    return (
        <div className="people-content-panel">
            <div className="people-content-panel-btn">
                <Link to={'/viewall/families'}>
                    <ButtonSmall text="Families" />
                </Link>
            </div>
            <div className="people-content-panel-head">
                <div className="people-content-panel-head-t">List of all</div>
            </div>
        </div>
    );
};

export const PeoplePage = () => {
    const [items, setItems] = useState<PersonType[]>([]);

    const fetchAll = async () => {
        window.scrollTo(0, 0);
        await getAll().then((data) => {
            setItems(data);
        });
    };

    useEffect(() => {
        if (items.length === 0) fetchAll();
    }, [items]);

    return (
        <div className="people-wrap">
            <div className="people-content-wrap">
                <PeoplePanel />
                <PersonHeader />

                <div className="people-table-wrap">
                    <PeopleTable visiblePeople={items.sort((a, b) => a.name.localeCompare(b.name))} />
                </div>
            </div>
        </div>
    );
};

export default PeoplePage;
