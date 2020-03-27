import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll } from '../services/personService';
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
                        <div className="stats-text">Youngest person: </div>
                        <div className="stats-text">Oldest person: </div>
                    </div>
                </div>
            </div>
        );
    }
}
