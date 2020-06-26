import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../types/PersonType';

interface SiblingsListProps {
    siblings: PersonType[];
}

export const SiblingsList = ({ siblings }: SiblingsListProps) =>
    siblings.length ? (
        <ul>
            {siblings.map((item, i) => {
                return (
                    <li key={i + 'sib'}>
                        <Link to={`/person/${item.id}`}>{item.name}</Link>
                    </li>
                );
            })}
        </ul>
    ) : (
        <ul>None</ul>
    );

export default SiblingsList;
