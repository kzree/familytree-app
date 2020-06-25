import React, { useState, useEffect } from 'react';
import { FamilyType } from '../types/FamilyType';
import { searchPeopleByQuery, getById, addPerson } from '../services/personService';
import { getAll } from '../services/familyService';
import {
    calculateAgeByPerson,
    getToday,
    initPersonFormInput,
    initPersonFormOptions,
    checkForErrors,
    cleanFormPerson,
} from '../services/util';
import ErrorBox from '../components/ErrorBox';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';
import { FamilyDropdown, ParentDropdown } from '../components/Dropdowns';
import PersonAdditionForm from '../types/PersonAdditionForm';
import PersonAdditonFormOptions from '../types/PersonAdditionFormOptions';
import { IoMdSearch } from 'react-icons/io';

export const PersonAdditionPage = () => {
    // Hooks
    const [personFormInput, setPersonFormInput] = useState<PersonAdditionForm>(initPersonFormInput);
    const [personFormOptions, setPersonFormOptions] = useState<PersonAdditonFormOptions>(initPersonFormOptions);
    const [families, setFamilies] = useState<FamilyType[]>([]);
    const [errorCodes, setErrorCodes] = useState<number[]>([]);
    const [alert, setAlert] = useState<boolean>(false);
    const history = useHistory();

    const familyValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setPersonFormInput({ ...personFormInput, familyId: e.currentTarget.value, motherId: '', fatherId: '' });
    };

    const nameValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setPersonFormInput({ ...personFormInput, name: e.currentTarget.value });
    };

    const motherIdValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setPersonFormInput({ ...personFormInput, motherId: e.currentTarget.value });
        if (e.currentTarget.value !== '') getParentAge(e.currentTarget.value);
    };

    const fatherIdValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setPersonFormInput({ ...personFormInput, fatherId: e.currentTarget.value });
        if (e.currentTarget.value !== '') getParentAge(e.currentTarget.value);
    };

    const genderValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonFormInput({ ...personFormInput, gender: e.currentTarget.value });
    };

    const birthDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonFormInput({ ...personFormInput, birthDate: e.currentTarget.value });
    };

    const deathDayValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonFormInput({ ...personFormInput, deathDate: e.currentTarget.value });
    };

    const motherQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonFormOptions({ ...personFormOptions, motherQuery: e.currentTarget.value });
    };

    const fatherQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonFormOptions({ ...personFormOptions, fatherQuery: e.currentTarget.value });
    };

    const hasMotherHandler = () => {
        setPersonFormOptions({
            ...personFormOptions,
            hasMother: !personFormOptions.hasMother,
            possibleMothers: [],
            motherQuery: '',
            motherAge: 0,
        });
        setPersonFormInput({ ...personFormInput, motherId: '' });
    };

    const hasFatherHandler = () => {
        setPersonFormOptions({
            ...personFormOptions,
            hasFather: !personFormOptions.hasFather,
            possibleFathers: [],
            fatherQuery: '',
            fatherAge: 0,
        });
        setPersonFormInput({ ...personFormInput, fatherId: '' });
    };

    const parentValueHandler = async (parent: string) => {
        if (parent === 'mother' && personFormOptions.hasMother && personFormOptions.motherQuery) {
            let searchQuery = personFormOptions.motherQuery;
            await searchPeopleByQuery(searchQuery.replace('+', '')).then((data) => {
                setPersonFormOptions({ ...personFormOptions, possibleMothers: data });
            });
        } else if (parent === 'mother' && personFormOptions.hasMother && !personFormOptions.motherQuery) {
            setPersonFormOptions({ ...personFormOptions, possibleMothers: [] });
        }

        if (parent === 'father' && personFormOptions.hasFather && personFormOptions.fatherQuery) {
            let searchQuery = personFormOptions.fatherQuery;
            await searchPeopleByQuery(searchQuery.replace('+', '')).then((data) => {
                setPersonFormOptions({ ...personFormOptions, possibleFathers: data, fatherQuery: searchQuery });
            });
        } else if (parent === 'father' && personFormOptions.hasFather && !personFormOptions.fatherQuery) {
            setPersonFormOptions({ ...personFormOptions, possibleFathers: [] });
        }
    };

    const getParentAge = async (id: string) => {
        await getById(id).then((data) => {
            data.gender === 'male'
                ? setPersonFormOptions({ ...personFormOptions, fatherAge: calculateAgeByPerson(data) })
                : setPersonFormOptions({ ...personFormOptions, motherAge: calculateAgeByPerson(data) });
        });
    };

    const postData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorCodes(checkForErrors(personFormInput, personFormOptions));

        if (checkForErrors(personFormInput, personFormOptions).length === 0) {
            const personToSend: PersonAdditionForm = personFormInput;
            cleanFormPerson(personToSend);

            addPerson(personToSend);
            setAlert(true);
        }
    };

    useEffect(() => {
        const fetchFamilyList = async () => {
            await getAll().then((data) => {
                setFamilies(data);
                setPersonFormInput({ ...personFormInput, familyId: data[0].id });
            });
        };

        if (families.length === 0) {
            fetchFamilyList();
        }
    }, [families, personFormInput]);

    let deathdayClass;
    if (personFormInput.isDead) {
        deathdayClass = 'person-form__input';
    } else {
        deathdayClass = 'person-form__input person-form__input--not-dead ';
    }

    return (
        <div className="addition-page">
            <Alert text="Person added successfully" open={alert} handleClose={() => history.push('/viewall')} />
            <div className="addition-page__content">
                <h2>Add new person</h2>
                <form onSubmit={postData} className="person-form">
                    <div className="person-form__input">
                        <label htmlFor="name-input">Name</label>
                        <input id="name-input" value={personFormInput.name} onChange={nameValueHandler} required />
                    </div>
                    <div className="person-form__input person-form__input--radio">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            onChange={genderValueHandler}
                            defaultChecked
                        />
                        <label htmlFor="male">Male</label>
                        <input type="radio" id="female" name="gender" value="female" onChange={genderValueHandler} />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className="person-form__input">
                        <label htmlFor="date-input">Birthday</label>
                        <input
                            type="date"
                            id="date-input"
                            max={getToday()}
                            value={personFormInput.birthDate}
                            onChange={birthDateHandler}
                            required
                        />
                    </div>
                    <div className="person-form__input person-form__input--check">
                        <label htmlFor="isdead">Dead</label>
                        <input
                            type="checkbox"
                            id="isdead"
                            checked={personFormInput.isDead}
                            onChange={() => setPersonFormInput({ ...personFormInput, isDead: !personFormInput.isDead })}
                        />
                    </div>
                    <div className={deathdayClass}>
                        <label htmlFor="deathday-input">Deathday</label>
                        {personFormInput.isDead && (
                            <input
                                type="date"
                                id="deathday-input"
                                max={getToday()}
                                value={personFormInput.deathDate}
                                onChange={deathDayValueHandler}
                                required
                            />
                        )}
                    </div>
                    <div className="person-form__input">
                        <FamilyDropdown families={families} handleChange={familyValueHandler} />
                    </div>
                    <div className="person-form__input person-form__input--check">
                        <label htmlFor="hasmother-input">Mother known</label>
                        <input
                            type="checkbox"
                            id="hasmother-input"
                            checked={personFormOptions.hasMother}
                            onClick={hasMotherHandler}
                        />
                    </div>
                    <div className="person-form__input extra-pad">
                        <label htmlFor="mother-search">Mother</label>
                        <input
                            id="mother-search"
                            placeholder="Search..."
                            value={personFormOptions.motherQuery}
                            onChange={motherQueryHandler}
                        />
                        <div className="parent-searchbtn" onClick={() => parentValueHandler('mother')}>
                            <IoMdSearch />
                        </div>
                    </div>
                    <div className="person-form__input">
                        <ParentDropdown
                            familiyId={personFormInput.familyId}
                            parents={personFormOptions.possibleMothers}
                            onChange={motherIdValueHandler}
                            gender="female"
                        />
                    </div>
                    <div className="person-form__input person-form__input--check">
                        <label htmlFor="hasfather-input">Father known</label>
                        <input
                            type="checkbox"
                            id="hasfather-input"
                            checked={personFormOptions.hasFather}
                            onClick={hasFatherHandler}
                        />
                    </div>
                    <div className="person-form__input extra-pad">
                        <label htmlFor="father-search">Father</label>
                        <input
                            id="father-search"
                            placeholder="Search..."
                            name="father-input"
                            value={personFormOptions.fatherQuery}
                            onChange={fatherQueryHandler}
                        />
                        <div className="parent-searchbtn" onClick={() => parentValueHandler('father')}>
                            <IoMdSearch />
                        </div>
                    </div>
                    <div className="person-form__input">
                        <ParentDropdown
                            familiyId={personFormInput.familyId}
                            parents={personFormOptions.possibleFathers}
                            onChange={fatherIdValueHandler}
                            gender="male"
                        />
                    </div>
                    <div className="submit-wrap">
                        <input type="submit" className="submitbtn"></input>
                    </div>
                    <div className="error-wrap">
                        <ErrorBox errors={errorCodes} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonAdditionPage;
