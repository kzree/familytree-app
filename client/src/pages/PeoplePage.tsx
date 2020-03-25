import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll } from '../services/personService';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';

const PeoplePanel = () => {
    return (
        <div className="people-content-panel">
            <div className="people-content-panel-head">
                <div className="people-content-panel-head-t">List of all</div>
            </div>
        </div>
    );
};

interface PeoplePageState {
    items: PersonType[];
}

export default class PeoplePage extends PureComponent<{}, PeoplePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: []
        };
    }

    fetchAll = async () => {
        await getAll().then(data => {
            this.setState({
                items: data
            });
        });
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.fetchAll();
    }

    render() {
        return (
            <div className="people-wrap">
                <div className="people-content-wrap">
                    <PeoplePanel />
                    <PersonHeader />

                    <div className="people-table-wrap">
                        <PeopleTable visiblePeople={this.state.items} />
                    </div>
                </div>
            </div>
        );
    }
}
