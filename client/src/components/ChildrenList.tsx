import React from 'react';
import PersonPageData from '../types/PersonPageData';
import { Link } from 'react-router-dom';

export const ChildrenList = (props: { personPageData: PersonPageData }) => {
    if (props.personPageData.children.length > 0) {
        return (
            <ul>
                {props.personPageData.children.map((child, i) => {
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
