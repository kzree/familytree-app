import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../types/PersonType';

interface SiblingsListProps {
    siblings: PersonType[];
}

export const SiblingsList = ({ siblings }: SiblingsListProps) =>
    siblings.length ? (
        <ul className="person-extra__list">
            {siblings.map((item, i) => (
                <li key={i + 'sib'}>
                    <Link to={`/person/${item.id}`}>{item.name}</Link>
                </li>
            ))}
        </ul>
    ) : (
        <ul className="person-extra__list">None</ul>
    );

export default SiblingsList;
