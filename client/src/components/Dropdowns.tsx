import React from 'react';
import { FamilyType } from '../types/FamilyType';
import { PersonType } from '../types/PersonType';
import { calculateAgeByPerson } from '../services/util';

interface familyDropdownProps {
    families: FamilyType[];
    handleChange: any;
}

export const FamilyDropdown = (props: familyDropdownProps) => (
    <>
        <div className="person-form__input">
            <label htmlFor="families">Family</label>
        </div>
        <select id="families" name="familyId" onChange={props.handleChange}>
            {props.families.map((item, i) => {
                return (
                    <option value={item.id} key={i}>
                        {item.name}
                    </option>
                );
            })}
        </select>
    </>
);

export const ParentDropdown = (props: { parents: PersonType[]; onChange: any; familiyId: string; gender: string }) =>
    props.parents.length ? (
        <>
            <div className="person-form__input">
                <label>Select</label>
            </div>
            <select id="parents" name={props.gender === 'male' ? 'fatherId' : 'motherId'} onChange={props.onChange}>
                <option value="">Please select</option>
                {props.parents.map((item, i) => {
                    const age = calculateAgeByPerson(item);
                    if (props.familiyId === item.family && props.gender === item.gender) {
                        return (
                            <option value={item.id} key={i}>
                                {item.name}
                                {', '}
                                {age}
                            </option>
                        );
                    }
                })}
            </select>
        </>
    ) : null;
