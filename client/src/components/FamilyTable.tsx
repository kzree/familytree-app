import React from 'react';
import Family from './Family';
import { FamilyType } from '../types/FamilyType';

interface FamilyTableProps {
    visibleFamilies: FamilyType[];
}

const FamilyTable = ({ visibleFamilies }: FamilyTableProps) => (
    <>
        {visibleFamilies.map((item, i) => {
            return <Family key={i} id={item.id} name={item.name} />;
        })}
    </>
);

export default FamilyTable;
