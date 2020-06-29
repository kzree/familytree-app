import React, { useState, useEffect } from 'react';
import { FamilyType } from '../types/FamilyType';
import { FamilyHeader } from '../components/Family';
import FamilyTable from '../components/FamilyTable';
import { getAll } from '../services/familyService';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export const FamiliesPage = () => {
    const [items, setItems] = useState<FamilyType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAll().then((data) => {
                setItems(data);
            });
        };

        fetchData();
    }, []);

    return (
        <main className="list-page">
            <section className="list-page__content">
                <div className="list-panel">
                    <nav className="list-panel__btn">
                        <Link to={'/viewall'}>
                            <Button buttonText="People" size="small" theme="main" />
                        </Link>
                    </nav>
                    <div className="list-panel__head-wrap">
                        <h2 className="list-panel__head">Families</h2>
                    </div>
                </div>
                <FamilyHeader />
                <FamilyTable visibleFamilies={items.sort((a, b) => a.name.localeCompare(b.name))} />
            </section>
        </main>
    );
};

export default FamiliesPage;
