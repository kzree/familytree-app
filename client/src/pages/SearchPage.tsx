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
            <div className="list-page">
                <div className="list-page__content">
                    <div className="search-panel">
                        <div className="search-panel__input">
                            <div className="search-panel__input__body">
                                <input type="text" placeholder="Search..." ref={searchRef} />
                                <div className="search-panel__input__btn" onClick={() => searchDatabase()}>
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
