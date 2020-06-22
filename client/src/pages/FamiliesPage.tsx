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
        <div className="list-page">
            <div className="list-page__content">
                <div className="list-panel">
                    <div className="list-panel__btn">
                        <Link to={'/viewall'}>
                            <ButtonSmall text="People" />
                        </Link>
                    </div>
                    <div className="list-panel__head">
                        <div className="list-panel__head__text">Families</div>
                    </div>
                </div>
                <FamilyHeader />
                <div className="list-page__content__table">
                    <FamilyTable visibleFamilies={items.sort((a, b) => a.name.localeCompare(b.name))} />
                </div>
            </div>
        </div>
    );
};

export default FamiliesPage;
