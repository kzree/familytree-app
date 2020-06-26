import React from 'react';
import Family from './Family';
import { FamilyType } from '../types/FamilyType';

interface FamilyTableProps {
    visibleFamilies: FamilyType[];
}

const FamilyTable = ({ visibleFamilies }: FamilyTableProps) => (
    <div className="list-page__table">
        {visibleFamilies.map((item, i) => {
            return <Family key={i} id={item.id} name={item.name} />;
        })}
    </div>
);

export default FamilyTable;
