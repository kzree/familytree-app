import React, { useState, useEffect } from 'react';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { PersonType } from '../types/PersonType';
import IdFromUrl from '../types/urlParamTypes';
import { getByFamilyId } from '../services/personService';

const FamilyPanel = () => (
    <div className="list-panel">
        <div className="list-panel__head">
            <div className="list-panel__text">List of family</div>
        </div>
    </div>
);

export const FamilyPage = (props: IdFromUrl) => {
    const [items, setItems] = useState<PersonType[]>([]);
    const [familyid, setFamilyid] = useState<string>('');

    useEffect(() => {
        const loadFamilyData = async () => {
            let idFromParams: string = props.match.params.id;
            await getByFamilyId(idFromParams).then((data) => {
                setItems(data);
                setFamilyid(idFromParams);
            });
        };

        if (familyid !== props.match.params.id) loadFamilyData();
    }, [familyid, props.match.params.id]);

    return (
        <div className="list-page">
            <div className="list-page__content">
                <FamilyPanel />
                <PersonHeader />

                <PeopleTable visiblePeople={items} />
            </div>
        </div>
    );
};

export default FamilyPage;
