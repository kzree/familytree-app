import React, { PureComponent } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { PersonType } from '../types/PersonType';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';

interface PeoplePageState {
    items: PersonType[];
}

export default class SearchPage extends PureComponent<{}, PeoplePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: []
        };
    }

    render() {
        return (
            <div>
                <div className="people-wrap">
                    <div className="people-content-wrap">
                        <div className="people-search-panel">
                            <div className="people-search-panel-input-wrap">
                                <div className="people-search-body">
                                    <input
                                        type="text"
                                        name="people-search-input"
                                        id="people-search-input"
                                        className="people-search-input"
                                    />
                                    <div className="people-search-btn">
                                        <IoMdSearch />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PersonHeader />
                        <div className="people-table-wrap">
                            <PeopleTable visiblePeople={this.state.items} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
