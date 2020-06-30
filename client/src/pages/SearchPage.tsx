import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { PersonType } from '../types/PersonType';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { getArrayOfPersonFromServer } from '../services/personService';

export const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<PersonType[]>([]);

    const searchDatabase = async () => {
        // Error checking
        const temp = searchQuery.trim();
        if (temp && temp !== ' ') {
            // Removing error causing symbol
            await getArrayOfPersonFromServer(`search/${searchQuery.replace('+', '')}`).then((data) => {
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
        <main className="list-page">
            <section className="list-page__content">
                <div className="search-panel">
                    <div className="search-panel__input-wrap">
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
                <PersonHeader />
                <PeopleTable visiblePeople={items} />
            </section>
        </main>
    );
};

export default SearchPage;
