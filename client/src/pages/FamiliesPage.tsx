import React, { useState, useEffect } from 'react';
import { FamilyType } from '../types/FamilyType';
import { FamilyHeader } from '../components/Family';
import FamilyTable from '../components/FamilyTable';
import { getAll } from '../services/familyService';
import { Link } from 'react-router-dom';
import { ButtonSmall } from '../components/Button';

export const FamiliesPage = () => {
    const [items, setItems] = useState<FamilyType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAll().then((data) => {
                setItems(data);
            });
        };

        if (items.length === 0) fetchData();

    }, [items]);

    return (
        <div className="people-wrap">
            <div className="people-content-wrap">
                <div className="people-content-panel">
                    <div className="people-content-panel-btn">
                        <Link to={'/viewall'}>
                            <ButtonSmall text="People" />
                        </Link>
                    </div>
                    <div className="people-content-panel-head">
                        <div className="people-content-panel-head-t">Families</div>
                    </div>
                </div>
                <FamilyHeader />
                <div className="people-table-wrap">
                    <FamilyTable visibleFamilies={items.sort((a, b) => a.name.localeCompare(b.name))} />
                </div>
            </div>
        </div>
    );
};

export default FamiliesPage;
