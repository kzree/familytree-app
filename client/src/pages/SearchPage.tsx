import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { PersonType } from '../types/PersonType';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { searchPeopleByQuery } from '../services/personService';

export const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<PersonType[]>([]);

    const searchDatabase = async () => {
        // Error checking
        const temp = searchQuery.trim();
        if (temp && temp !== ' ') {
            // Removing error causing symbol
            await searchPeopleByQuery(temp.replace('+', '')).then((data) => {
                setItems(data);
            });
        } else {
            setItems([]);
        }
    };

    const searchQueryValueHandler = (e: React.FormEvent<any>) => {
        setSearchQuery(e.currentTarget.value);
    };

    return (
        <div>
            <div className="list-page">
                <div className="list-page__content">
                    <div className="search-panel">
                        <div className="search-panel__input-wrap">
                            <div className="search-panel__input">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={searchQueryValueHandler}
                                />
                                <div className="search-panel__search-btn" onClick={() => searchDatabase()}>
                                    <IoMdSearch />
                                </div>
                            </div>
                        </div>
                    </div>
                    <PersonHeader />
                    <div className="list-page__table">
                        <PeopleTable visiblePeople={items} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
