import React from 'react';
import PersonPageData from '../types/PersonPageData';
import { Link } from 'react-router-dom';

export const SiblingsList = (props: { personPageData: PersonPageData }) => {
    if (props.personPageData.siblings.length > 0) {
        return (
            <ul>
                {props.personPageData.siblings.map((item, i) => {
                    return (
                        <li key={i + 'sib'}>
                            <Link to={`/person/${item.id}`}>{item.name}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return <ul>None</ul>;
    }
};

export default SiblingsList;
