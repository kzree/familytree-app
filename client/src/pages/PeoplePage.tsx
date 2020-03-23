import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll } from '../services/personService';
import Person from '../components/Person';

const PeoplePanel = () => {
    return (
        <div className="people-content-panel">
            <div className="people-content-panel-head">
                <div className="people-content-panel-head-t">List of all</div>
            </div>
        </div>
    );
};

export default class PeoplePage extends PureComponent {
    items: PersonType[];
    constructor(props: Readonly<{}>) {
        super(props);
        this.items = [];
    }

    fetchAll = async () => {
        await getAll().then(data => {
            for (let i = 0; i < data.length; i++) {
                this.items[i] = data[i];
            }
        });

        console.log('DEBUG: ', this.items);
    };

    componentDidMount() {
        this.fetchAll();
    }

    render() {
        return (
            <div className="people-wrap">
                <div className="people-content-wrap">
                    <PeoplePanel />
                </div>
            </div>
        );
    }
}
