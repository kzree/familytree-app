import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { PersonInterface } from '../types/PersonType';
import { calculateAgeByPerson, calculateAgeByParams } from '../services/util';

interface state {
    id: string;
    age: number;
    name: string;
}

export default class Person extends PureComponent<PersonInterface, state> {
    constructor(props: PersonInterface) {
        super(props);
        this.state = {
            id: '',
            age: 0,
            name: ''
        };
    }

    checkIfDead = () => {
        if (this.props.dead) {
            return '✝' + this.props.name;
        } else {
            return this.props.name;
        }
    };

    init = () => {
        this.setState({
            id: this.props.id,
            age: calculateAgeByParams(this.props.birthDate, this.props.deathDate, this.props.dead),
            name: this.checkIfDead()
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
            <Link to={`/person/${this.props.id}`}>
                <div className="person-wrap">
                    <div className="person-body">
                        <div className="person-body-name">{this.state.name}</div>
                        <div className="person-body-gender">{this.props.gender}</div>
                        <div className="person-body-age">{this.state.age}</div>
                        <div className="person-body-birthday">{this.props.birthDate}</div>
                    </div>
                </div>
            </Link>
        );
    }
}

export const PersonHeader = () => {
    return (
        <div className="person-head-wrap">
            <div className="person-head-body">
                <div className="person-body-name">Name</div>
                <div className="person-body-gender">Gender</div>
                <div className="person-body-age">Age</div>
                <div className="person-body-birthday">Birthday</div>
            </div>
        </div>
    );
};
