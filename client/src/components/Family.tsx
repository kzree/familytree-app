import React, { useState, useEffect } from 'react';
import { FamilyInterface } from '../types/FamilyType';
import { Link } from 'react-router-dom';
import { getByFamilyId } from '../services/personService';

export const Family = (props: FamilyInterface) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [members, setMembers] = useState(0);

    useEffect(() => {
        setId(props.id);

        const fetchData = async () => {
            await getByFamilyId(props.id).then((data) => {
                setName(props.name);
                setMembers(data.length);
            });
        };

        fetchData();
    }, [id, props.id, props.name]);

    return (
        <Link to={`/family/${id}`}>
            <div className="family family--item">
                <div className="family__body">
                    <p className="family__name">{name}</p>
                    <p className="family__members">{members}</p>
                </div>
            </div>
        </Link>
    );
};

export const FamilyHeader = () => {
    return (
        <div className="family family--header">
            <div className="family__body family__body--header">
                <div className="family__name">Family name</div>
                <div className="family__members">Members</div>
            </div>
        </div>
    );
};

export default Family;
