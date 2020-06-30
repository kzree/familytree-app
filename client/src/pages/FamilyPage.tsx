import React, { useState, useEffect } from 'react';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { PersonType } from '../types/PersonType';
import IdFromUrl from '../types/urlParamTypes';
import { getArrayOfPersonFromServer } from '../services/personService';

const FamilyPanel = () => (
    <div className="list-panel">
        <div className="list-panel__head-wrap">
            <h2 className="list-panel__head">List of family</h2>
        </div>
    </div>
);

export const FamilyPage = (props: IdFromUrl) => {
    const [items, setItems] = useState<PersonType[]>([]);
    const [familyid, setFamilyid] = useState<string>('');

    useEffect(() => {
        const loadFamilyData = async () => {
            let idFromParams: string = props.match.params.id;
            await getArrayOfPersonFromServer(`family/${idFromParams}`).then((data) => {
                setItems(data);
                setFamilyid(idFromParams);
            });
        };

        if (familyid !== props.match.params.id) loadFamilyData();
    }, [familyid, props.match.params.id]);

    return (
        <main className="list-page">
            <section className="list-page__content">
                <FamilyPanel />
                <PersonHeader />

                <PeopleTable visiblePeople={items} />
            </section>
        </main>
    );
};

export default FamilyPage;
