import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { getAll } from '../services/personService';
import Person, { PersonHeader } from '../components/Person';

const PeoplePanel = () => {
    return (
        <div className="people-content-panel">
            <div className="people-content-panel-head">
                <div className="people-content-panel-head-t">List of all</div>
            </div>
        </div>
    );
};

const PeopleTable = (props: { visiblePeople: PersonType[] }) => {
    return (
        <>
            {props.visiblePeople.map((item, i) => {
                return (
                    <Person
                        key={i}
                        id={item.id}
                        name={item.name}
                        birthDate={item.birthDate}
                        deathDate={item.deathDate}
                        dead={item.dead}
                        gender={item.gender}
                        parent1={item.parent1}
                        parent2={item.parent2}
                    />
                );
            })}
        </>
    );
};

interface PeoplePageState {
    update: number;
}

export default class PeoplePage extends PureComponent<{}, PeoplePageState> {
    items: PersonType[];
    constructor(props: any) {
        super(props);
        this.items = [];
        this.state = {
            update: 1
        };
    }

    fetchAll = async () => {
        await getAll().then(data => {
            this.items = data;
        });

        this.setState({
            update: this.items.length
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
                    <div className="people-table-wrap">
                        <PersonHeader />
                        <PeopleTable visiblePeople={this.items} />
                    </div>
                </div>
            </div>
        );
    }
}
