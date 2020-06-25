import React from 'react';
import PersonPageData from '../types/PersonPageData';
import { Link } from 'react-router-dom';
import { PersonType } from '../types/PersonType';

export const ChildrenList = (props: { /* personPageData: PersonPageData */ children: PersonType[] }) =>
    props.children.length ? (
        <ul>
            {props.children.map((child, i) => {
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
