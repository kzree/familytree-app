import React from 'react';
import PersonPageData from '../types/PersonPageData';
import { Link } from 'react-router-dom';
import { PersonType } from '../types/PersonType';

export const ChildrenList = (props: { /* personPageData: PersonPageData */ children: PersonType[] }) => {
    if (props.children.length > 0) {
        return (
            <ul>
                {props.children.map((child, i) => {
                    return (
                        <li key={i + 'child'}>
                            <Link to={`/person/${child.id}`}>{child.name}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return <ul>None</ul>;
    }
};

export default ChildrenList;
