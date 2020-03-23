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

    calculateAge = (dateString: string) => {
        let birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / 31557600000);
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
            age: this.calculateAge(this.props.birthDate),
            name: this.checkIfDead()
        });
    };

    componentDidMount = () => {
        this.init();
    };

    componentDidUpdate = () => {
        if (this.state.id != this.props.id) {
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
                </div>
            </div>
        );
    }
}
