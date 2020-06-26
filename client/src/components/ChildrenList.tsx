import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../types/PersonType';

interface ChildrenListProps {
    childrenList: PersonType[];
}

export const ChildrenList = (props: ChildrenListProps) =>
    props.childrenList.length ? (
        <ul>
            {props.childrenList.map((child, i) => {
                return (
                    <li key={i + 'child'}>
                        <Link to={`/person/${child.id}`}>{child.name}</Link>
                    </li>
                );
            })}
        </ul>
    ) : (
        <ul>None</ul>
    );

export default ChildrenList;
