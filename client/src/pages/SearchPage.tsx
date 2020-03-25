import React, { PureComponent } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { PersonType } from '../types/PersonType';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { searchPeopleByQuery } from '../services/personService';

interface PeoplePageState {
    items: PersonType[];
}

export default class SearchPage extends PureComponent<{}, PeoplePageState> {
    searchRef: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);
        this.state = {
            items: []
        };
        this.searchRef = React.createRef();
    }

    searchDatabase = async () => {
        let searchQuery = this.searchRef.current.value.replace(/ +(?= )/g, '');
        if (searchQuery !== '' && searchQuery !== ' ') {
            await searchPeopleByQuery(searchQuery.replace('+', '')).then(
                data => {
                    this.setState({
                        items: data
                    });
                }
            );
        } else {
            this.setState({
                items: []
            });
        }
    };

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
                                        placeholder="Search..."
                                        ref={this.searchRef}
                                    />
                                    <div
                                        className="people-search-btn"
                                        onClick={() => this.searchDatabase()}
                                    >
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
