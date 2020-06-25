import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../types/PersonType';

export const SiblingsList = (props: { siblings: PersonType[] }) => {
    if (props.siblings.length > 0) {
        return (
            <ul>
                {props.siblings.map((item, i) => {
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
