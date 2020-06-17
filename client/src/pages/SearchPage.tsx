import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { PersonType } from '../types/PersonType';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { searchPeopleByQuery } from '../services/personService';

export const SearchPage = () => {
    const searchRef: React.RefObject<HTMLInputElement> = React.createRef();
    const [items, setItems] = useState<PersonType[]>([]);

    const searchDatabase = async () => {
        // Remove unnecessary spaces
        let searchQuery = searchRef.current.value.replace(/ +(?= )/g, '');
        // Error checking
        if (searchQuery !== '' && searchQuery !== ' ') {
            // Removing error causing symbol
            await searchPeopleByQuery(searchQuery.replace('+', '')).then((data) => {
                setItems(data);
            });
        } else {
            setItems([]);
        }
    };

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
                                    ref={searchRef}
                                />
                                <div className="people-search-btn" onClick={() => searchDatabase()}>
                                    <IoMdSearch />
                                </div>
                            </div>
                        </div>
                    </div>
                    <PersonHeader />
                    <div className="people-table-wrap">
                        <PeopleTable visiblePeople={items} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
