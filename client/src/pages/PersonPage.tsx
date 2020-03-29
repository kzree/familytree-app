import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getById, getByFamilyId, getChildren, getSiblings, deleteById } from '../services/personService';
import { Link, Redirect } from 'react-router-dom';
import { ButtonSmallAlt } from '../components/Button';
import IdFromUrl from '../types/urlParamTypes';
import Alert from '../components/Alert';
import { calculateAgeByPerson } from '../services/util';
import Confirmation from '../components/Confirmation';

interface StateTypes {
    personId: string;
    person: PersonType;
    age: number;
    name: string;
    parent1name: string;
    parent2name: string;
    parent1id: string;
    parent2id: string;
    children: PersonType[];
    siblings: PersonType[];
    childNumber: number;
    status: string;
    alert: boolean;
    confirm: boolean;
    redirect: number;
    docRelativesAmount: number;
}

export default class PersonPage extends PureComponent<IdFromUrl, StateTypes> {
    constructor(props: IdFromUrl) {
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
            children: [],
            siblings: [],
            childNumber: 1,
            status: 'alive',
            alert: false,
            confirm: false,
            redirect: 0,
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
            this.getPersonChildren();
            this.getPersonSiblings();
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
        this.setState({
            age: calculateAgeByPerson(this.state.person)
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
                docRelativesAmount: data.length - 1
            });
        });
    };

    getPersonChildren = async () => {
        await getChildren(this.state.personId).then(data => {
            this.setState({
                children: data
            });
        });
    };

    getPersonSiblings = async () => {
        await getSiblings(this.state.personId).then(data => {
            this.setState({
                siblings: data
            });
            this.getChildNumber();
        });
    };

    renderChildren = () => {
        if (this.state.children.length > 0) {
            return (
                <>
                    {this.state.children.map((item, i) => {
                        return (
                            <li>
                                <Link to={`/person/${item.id}`}>{item.name}</Link>
                            </li>
                        );
                    })}
                </>
            );
        } else {
            return <>None</>;
        }
    };

    renderSiblings = () => {
        if (this.state.siblings.length > 0) {
            return (
                <>
                    {this.state.siblings.map((item, i) => {
                        return (
                            <li>
                                <Link to={`/person/${item.id}`}>{item.name}</Link>
                            </li>
                        );
                    })}
                </>
            );
        } else {
            return <>None</>;
        }
    };

    toggleAlert = () => {
        this.setState({
            alert: !this.state.alert
        });
    };

    toggleConfirm = () => {
        this.setState({
            confirm: !this.state.confirm
        });
    };

    getChildNumber = () => {
        if (this.state.siblings.length === 0) {
            this.setState({
                childNumber: 1
            });
        } else {
            let birthdayDates = [];
            birthdayDates.push(new Date(this.state.person.birthDate));
            this.state.siblings.forEach(sibling => {
                birthdayDates.push(new Date(sibling.birthDate));
            });
            birthdayDates.sort((a, b) => a.getTime() - b.getTime());
            for (let i = 0; i < birthdayDates.length; i++) {
                if (birthdayDates[i].getTime() === new Date(this.state.person.birthDate).getTime()) {
                    this.setState({
                        childNumber: i + 1
                    });
                }
            }
        }
    };

    deleteThisPerson = () => {
        deleteById(this.state.person.id);
        this.setState({
            redirect: 1
        });
    };

    render() {
        let profileClass = '';
        if (this.state.person.gender === 'male') {
            profileClass = 'person-page-info-pic-male';
        } else {
            profileClass = 'person-page-info-pic-female';
        }
        if (this.state.redirect) {
            return <Redirect to="/viewall" />;
        }
        return (
            <div className="person-page-wrap">
                {/*prettier-ignore*/}
                <Alert 
                    text="Feature not yet available" 
                    open={this.state.alert} 
                    handleClose={this.toggleAlert} 
                />
                <Confirmation
                    text="Are you sure you want to delete this person"
                    handleClose={this.toggleConfirm}
                    handleOk={this.deleteThisPerson}
                    open={this.state.confirm}
                />
                <div className="person-page-content">
                    <div className="person-page-info">
                        <div className="person-page-info-pic-wrap">
                            <div className={profileClass}></div>
                        </div>
                        <div className="person-page-info-content">
                            <div className="person-page-info-content-text">{this.state.name}</div>
                            <div className="person-page-info-content-text">Age: {this.state.age}</div>
                        </div>
                    </div>
                    <div className="person-page-extra">
                        <h1>Information</h1>
                        <div className="person-page-extra-info">
                            <div className="person-page-extra-info-text">Name: {this.state.name}</div>
                            <div className="person-page-extra-info-text">Age: {this.state.age}</div>
                            <div className="person-page-extra-info-text">Birthday: {this.state.person.birthDate}</div>
                            <div className="person-page-extra-info-text">Status: {this.state.status}</div>
                            <div className="person-page-extra-info-text">
                                Mother: <Link to={`/person/${this.state.parent1id}`}>{this.state.parent1name}</Link>
                            </div>
                            <div className="person-page-extra-info-text">
                                Father: <Link to={`/person/${this.state.parent2id}`}>{this.state.parent2name}</Link>
                            </div>
                            <div className="person-page-extra-info-text">
                                # child of family: {this.state.childNumber}
                            </div>
                            <div className="person-page-extra-info-text">
                                Number of documented relatives: {this.state.docRelativesAmount}
                            </div>
                            <div className="person-page-extra-info-text">
                                Children: <br />
                                <div className="person-scroll-content">
                                    <ul>{this.renderChildren()}</ul>
                                </div>
                            </div>
                            <div className="person-page-extra-info-text">
                                Siblings: <br />
                                <div className="person-scroll-content">
                                    <ul>{this.renderSiblings()}</ul>
                                </div>
                            </div>
                        </div>
                        <div className="person-page-edit">
                            <ButtonSmallAlt text="Edit" handleClick={this.toggleAlert} />
                        </div>
                        <div className="person-page-delete">
                            <ButtonSmallAlt text="Delete" handleClick={this.toggleConfirm} />
                        </div>
                        <div className="person-page-low-panel">
                            <div className="person-page-extra-info-text">
                                <Link to={`/family/${this.state.person.family}`}>View all relatives</Link>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
