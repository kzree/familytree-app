import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../types/PersonType';

interface ChildrenListProps {
    childrenList: PersonType[];
}

export const ChildrenList = ({ childrenList }: ChildrenListProps) =>
    childrenList.length ? (
        <ul className="person-extra__list">
            {childrenList.map((child, i) => {
                return (
                    <li key={i + 'child'}>
                        <Link to={`/person/${child.id}`}>{child.name}</Link>
                    </li>
                );
            })}
        </ul>
    ) : (
        <ul className="person-extra__list">None</ul>
    );

export default ChildrenList;
