import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getById } from '../services/personService';
import { RouteComponentProps } from 'react-router-dom';

type PathParamsType = {
    id: string;
};

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    someString: string;
};

interface StateTypes {
    personId: string;
    person: PersonType;
    age: number;
}

export default class PersonPage extends PureComponent<PropsType, StateTypes> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            personId: null,
            person: {
                id: '',
                birthDate: '1999/10/10',
                deathDate: null,
                dead: false,
                gender: '',
                name: '',
                parent1: null,
                parent2: null
            },
            age: 0
        };
    }

    componentDidMount = () => {
        this.fetchPerson();
    };

    fetchPerson = async () => {
        let pId: string = this.props.match.params.id;
        await getById(pId).then(data => {
            this.setState({
                personId: data.id,
                person: data,
                age: this.calculateAge()
            });
        });
    };

    calculateAge = () => {
        if (!this.state.person.dead) {
            let birthday = +new Date(this.state.person.birthDate);
            return ~~((Date.now() - birthday) / 31557600000);
        } else {
            let birthday = +new Date(this.state.person.birthDate);
            let deathday = +new Date(this.state.person.deathDate);
            return ~~((deathday - birthday) / 31557600000);
        }
    };

    render() {
        return (
            <div className="person-page-wrap">
                <div className="person-page-content">
                    {this.state.person.name}
                </div>
            </div>
        );
    }
}
