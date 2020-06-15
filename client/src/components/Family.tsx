import React, { PureComponent, useState, useEffect } from 'react';
import { FamilyInterface } from '../types/FamilyType';
import { Link } from 'react-router-dom';
import { getByFamilyId } from '../services/personService';

interface state {
    id: string;
    name: string;
    members: number;
}

export default class Family extends PureComponent<FamilyInterface, state> {
    constructor(props: FamilyInterface) {
        super(props);

        this.state = {
            id: '',
            name: '',
            members: 0
        };
    }

    init = async () => {
        await getByFamilyId(this.props.id).then(data => {
            this.setState({
                id: this.props.id,
                name: this.props.name,
                members: data.length
            });
        });
    };

    componentDidMount = () => {
        this.init();
    };

    componentDidUpdate = () => {
        if (this.state.id !== this.props.id) {
            this.init();
        }
    };

    render() {
        return (
            <Link to={`/family/${this.state.id}`}>
                <div className="family-wrap">
                    <div className="family-body">
                        <div className="family-name">{this.state.name}</div>
                        <div className="family-members">
                            {this.state.members}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export const FamilyHook = (props: FamilyInterface) => {
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
