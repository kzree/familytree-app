import React, { useState, useEffect } from 'react';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { PersonType } from '../types/PersonType';
import IdFromUrl from '../types/urlParamTypes';
import { getByFamilyId } from '../services/personService';

const FamilyPanel = () => {
    return (
        <div className="people-content-panel">
            <div className="people-content-panel-head">
                <div className="people-content-panel-head-t">List of family</div>
            </div>
        </div>
    );
};

export const FamilyPage = (props: IdFromUrl) => {
    const [items, setItems] = useState<PersonType[]>([]);
    const [familyid, setFamilyid] = useState<string>('');

    useEffect(() => {
        const init = async () => {
            let idFromParams: string = props.match.params.id;
            await getByFamilyId(idFromParams).then((data) => {
                setItems(data);
                setFamilyid(idFromParams);
            });
        };

        if (familyid !== props.match.params.id) init();
    }, [familyid, props.match.params.id]);

    return (
        <div className="people-wrap">
            <div className="people-content-wrap">
                <FamilyPanel />
                <PersonHeader />

                <div className="people-table-wrap">
                    <PeopleTable visiblePeople={items} />
                </div>
            </div>
        </div>
    );
};

export default FamilyPage;
