import React from 'react';
import Family, { FamilyHook } from './Family';
import { FamilyType } from '../types/FamilyType';

const FamilyTable = (props: { visibleFamilies: FamilyType[] }) => {
    return (
        <>
            {props.visibleFamilies.map((item, i) => {
                return <FamilyHook key={i} id={item.id} name={item.name} />;
            })}
        </>
    );
};

export default FamilyTable;
