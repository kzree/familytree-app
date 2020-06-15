import React, { useState, useEffect } from 'react';
import { FamilyInterface } from '../types/FamilyType';
import { Link } from 'react-router-dom';
import { getByFamilyId } from '../services/personService';

interface state {
    id: string;
    name: string;
    members: number;
}


export const Family = (props: FamilyInterface) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [members, setMembers] = useState(0);

    useEffect(() => {
        setId(props.id);

        const fetchData = async () => {
            await getByFamilyId(props.id).then(data => {
                setName(props.name);
                setMembers(data.length);
            });
        }

        fetchData();
    }, [id, props.id, props.name])

    return (
        <Link to={`/family/${id}`}>
            <div className="family-wrap">
                <div className="family-body">
                    <div className="family-name">{name}</div>
                    <div className="family-members">
                        {members}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export const FamilyHeader = () => {
    return (
        <div className="family-head-wrap">
            <div className="family-head-body">
                <div className="family-name">Family name</div>
                <div className="family-members">Members</div>
            </div>
        </div>
    );
};

export default Family;