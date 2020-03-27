import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll, getYoungestPerson, getOldestPerson } from '../services/personService';
import { getAll as getAllFamilies } from '../services/familyService';
import { Link } from 'react-router-dom';

interface StatsPageState {
    totalPeople: number;
    totalFamilies: number;
    youngestPerson: PersonType;
    oldestPerson: PersonType;
}

export default class StatsPage extends PureComponent<{}, StatsPageState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            totalPeople: 0,
            totalFamilies: 0,
            youngestPerson: null,
            oldestPerson: null
        };
    }

    componentDidMount = () => {
        this.init();
    };

    init = () => {
        this.getTotalPeopleAmount();
        this.getTotalFamiliesAmount();
        this.getTheYoungestPerson();
        this.getTheOldestPerson();
    };

    getTotalPeopleAmount = async () => {
        await getAll().then(data => {
            this.setState({
                totalPeople: data.length
            });
        });
    };

    getTotalFamiliesAmount = async () => {
        await getAllFamilies().then(data => {
            this.setState({
                totalFamilies: data.length
            });
        });
    };

    getTheYoungestPerson = async () => {
        await getYoungestPerson().then(data => {
            this.setState({
                youngestPerson: data
            });
        });
    };

    getTheOldestPerson = async () => {
        await getOldestPerson().then(data => {
            this.setState({
                oldestPerson: data
            });
        });
    };

    renderYoungest = () => {
        if (this.state.youngestPerson != null) {
            return <Link to={`/person/${this.state.youngestPerson.id}`}>{this.state.youngestPerson.name}</Link>;
        } else {
            return <>-</>;
        }
    };

    renderOldest = () => {
        if (this.state.oldestPerson != null) {
            return <Link to={`/person/${this.state.oldestPerson.id}`}>{this.state.oldestPerson.name}</Link>;
        } else {
            return <>-</>;
        }
    };

    render() {
        return (
            <div className="people-wrap">
                <div className="people-content-wrap">
                    <div className="stats-content">
                        <div className="stats-text">
                            Total amount of people: <Link to={'/viewall'}>{this.state.totalPeople}</Link>
                        </div>
                        <div className="stats-text">
                            Total amount of families: <Link to={'/viewall/families'}>{this.state.totalFamilies}</Link>
                        </div>
                        <div className="stats-text">
                            Youngest person: <this.renderYoungest />
                        </div>
                        <div className="stats-text">
                            Oldest person: <this.renderOldest />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
