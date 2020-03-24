import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getById, getByFamilyId } from '../services/personService';
import { RouteComponentProps, Link } from 'react-router-dom';
import { ButtonSmallAlt } from '../components/Button';

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
    name: string;
    parent1name: string;
    parent2name: string;
    parent1id: string;
    parent2id: string;
    status: string;
    docRelativesAmount: number;
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
                parent2: null,
                family: ''
            },
            age: 0,
            name: '',
            parent1name: '-',
            parent2name: '-',
            parent1id: '',
            parent2id: '',
            status: 'alive',
            docRelativesAmount: 0
        };
    }

    componentDidMount = () => {
        this.init();
    };

    componentDidUpdate = () => {
        if (this.state.personId !== this.props.match.params.id) {
            this.init();
        }
    };

    init = async () => {
        let pId: string = this.props.match.params.id;
        await getById(pId).then(data => {
            this.setState({
                personId: data.id,
                person: data,
                parent1id: data.parent1,
                parent2id: data.parent2
            });
            this.checkIfDead();
            this.calculateAge();
            this.getParents();
            this.getRelatives();
        });
    };

    checkIfDead = () => {
        if (this.state.person.dead) {
            this.setState({
                name: '✝' + this.state.person.name,
                status: 'Deceased (' + this.state.person.deathDate + ')'
            });
        } else {
            this.setState({
                name: this.state.person.name,
                status: 'Alive'
            });
        }
    };

    calculateAge = () => {
        let newAge = 0;
        if (!this.state.person.dead) {
            let birthday = +new Date(this.state.person.birthDate);
            newAge = ~~((Date.now() - birthday) / 31557600000);
        } else {
            let birthday = +new Date(this.state.person.birthDate);
            let deathday = +new Date(this.state.person.deathDate);
            newAge = ~~((deathday - birthday) / 31557600000);
        }
        this.setState({
            age: newAge
        });
    };

    getParents = async () => {
        // Check if parent exists
        if (this.state.parent1id !== null && this.state.parent1id !== '') {
            await getById(this.state.parent1id).then(data => {
                if (data.dead) {
                    this.setState({
                        parent1name: '✝' + data.name
                    });
                } else {
                    this.setState({
                        parent1name: data.name
                    });
                }
            });
        } else {
            this.setState({
                parent1name: '-',
                parent1id: this.state.personId
            });
        }
        // Check if parent exists
        if (this.state.parent2id !== null && this.state.parent2id !== '') {
            await getById(this.state.parent2id).then(data => {
                if (data.dead) {
                    this.setState({
                        parent2name: '✝' + data.name
                    });
                } else {
                    this.setState({
                        parent2name: data.name
                    });
                }
            });
        } else {
            this.setState({
                parent2name: '-',
                parent2id: this.state.personId
            });
        }
    };

    getRelatives = async () => {
        await getByFamilyId(this.state.person.family).then(data => {
            this.setState({
                docRelativesAmount: data.length
            });
        });
    };

    render() {
        let profileClass = '';
        if (this.state.person.gender === 'male') {
            profileClass = 'person-page-info-pic-male';
        } else {
            profileClass = 'person-page-info-pic-female';
        }
        return (
            <div className="person-page-wrap">
                <div className="person-page-content">
                    <div className="person-page-info">
                        <div className="person-page-info-pic-wrap">
                            <div className={profileClass}></div>
                        </div>
                        <div className="person-page-info-content">
                            <div className="person-page-info-content-text">
                                {this.state.name}
                            </div>
                            <div className="person-page-info-content-text">
                                Age: {this.state.age}
                            </div>
                        </div>
                    </div>
                    <div className="person-page-extra">
                        <h1>Information</h1>
                        <div className="person-page-extra-info">
                            <div className="person-page-extra-info-text">
                                Name: {this.state.name}
                            </div>
                            <div className="person-page-extra-info-text">
                                Age: {this.state.age}
                            </div>
                            <div className="person-page-extra-info-text">
                                Birthday: {this.state.person.birthDate}
                            </div>
                            <div className="person-page-extra-info-text">
                                Status: {this.state.status}
                            </div>
                            <div className="person-page-extra-info-text">
                                Mother:{' '}
                                <Link to={`/person/${this.state.parent1id}`}>
                                    {this.state.parent1name}
                                </Link>
                            </div>
                            <div className="person-page-extra-info-text">
                                Father:{' '}
                                <Link to={`/person/${this.state.parent2id}`}>
                                    {this.state.parent2name}
                                </Link>
                            </div>
                            <div className="person-page-extra-info-text">
                                Number of documented relatives:{' '}
                                {this.state.docRelativesAmount}
                            </div>
                        </div>
                        <div className="person-page-edit">
                            <ButtonSmallAlt text="Edit" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
