import React, { PureComponent } from 'react';
import { PersonInterface } from '../types/PersonType';

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

    calculateAge = () => {
        if (!this.props.dead) {
            let birthday = +new Date(this.props.birthDate);
            return ~~((Date.now() - birthday) / 31557600000);
        } else {
            let birthday = +new Date(this.props.birthDate);
            let deathday = +new Date(this.props.deathDate);
            return ~~((deathday - birthday) / 31557600000);
        }
    };

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
            age: this.calculateAge(),
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
            <div className="person-wrap">
                <div className="person-body">
                    <div className="person-body-name">{this.state.name}</div>
                    <div className="person-body-gender">
                        {this.props.gender}
                    </div>
                    <div className="person-body-age">{this.state.age}</div>
                    <div className="person-body-birthday">
                        {this.props.birthDate}
                    </div>
                </div>
            </div>
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
