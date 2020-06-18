import React, { useState, useEffect } from 'react';
import { FamilyType } from '../types/FamilyType';
import { searchPeopleByQuery, getById, addPerson } from '../services/personService';
import { getAll } from '../services/familyService';
import { ButtonBigAlt } from '../components/Button';
import {
    calculateAgeByPerson,
    calculateAgeByParams,
    getToday,
    initPersonFormInput,
    initPersonFormOptions,
} from '../services/util';
import ErrorBox from '../components/ErrorBox';
import { Redirect } from 'react-router-dom';
import Alert from '../components/Alert';
import { FamilyDropdown, ParentDropdown } from '../components/Dropdowns';
import PersonAdditionForm from '../types/PersonAdditionForm';
import PersonAdditonFormOptions from '../types/PersonAdditionFormOptions';

export const PersonAdditionPage = () => {
    // Hooks
    const [personFormInput, setPersonFormInput] = useState<PersonAdditionForm>(initPersonFormInput);
    const [personFormOptions, setPersonFormOptions] = useState<PersonAdditonFormOptions>(initPersonFormOptions);

    const [families, setFamilies] = useState<FamilyType[]>([]);
    const [errorCodes, setErrorCodes] = useState<number[]>([]);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    const parentValueHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let searchQuery = e.currentTarget.value;
        // Error checking
        /*         if (searchQuery && searchQuery !== ' ') {
            // Removing error causing symbol
            await searchPeopleByQuery(searchQuery.replace('+', '')).then((data) => {
                mother
                    ? setPersonFormOptions({ ...personFormOptions, possibleMothers: data })
                    : setPersonFormOptions({ ...personFormOptions, possibleFathers: data });
            });
        } else {
            mother
                ? setPersonFormOptions({ ...personFormOptions, possibleMothers: [] })
                : setPersonFormOptions({ ...personFormOptions, possibleFathers: [] });
        } */
    };

    const familyValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setPersonFormInput({ ...personFormInput, familyId: e.currentTarget.value });
        resetParents();
    };

    const resetParents = () => {
        setPersonFormInput({ ...personFormInput, motherId: '', fatherId: '' });
    };

    const motherValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setPersonFormInput({ ...personFormInput, motherId: e.currentTarget.value });
        if (e.currentTarget.value !== '') getParentAge(e.currentTarget.value);
    };

    const fatherValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setPersonFormInput({ ...personFormInput, fatherId: e.currentTarget.value });
        if (e.currentTarget.value !== '') getParentAge(e.currentTarget.value);
    };

    const genderValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonFormInput({ ...personFormInput, gender: e.currentTarget.value });
    };

    const birthDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonFormInput({ ...personFormInput, birthDate: e.currentTarget.value });
    };

    const motherQueryHandler = (query: string) => {};

    const getParentAge = async (id: string) => {
        await getById(id).then((data) => {
            data.gender === 'male'
                ? setPersonFormOptions({ ...personFormOptions, fatherAge: calculateAgeByPerson(data) })
                : setPersonFormOptions({ ...personFormOptions, motherAge: calculateAgeByPerson(data) });
        });
    };

    const checkForErrors = () => {
        let errors = [];
        // Start error checking
        const name = personFormInput.name.replace(/ +(?= )/g, '');
        if (name.length === 0 || name === ' ') {
            errors.push(0); // Error == Name cannot be empty
        }
        // Parent check
        let age = calculateAgeByParams(personFormInput.birthDate, personFormInput.deathDate, personFormInput.isDead);
        // Check birthdate
        if (new Date(personFormInput.birthDate) > new Date(getToday())) {
            errors.push(1); // Error == Birthdate can not be bigger than the date today
        }
        if (personFormInput.birthDate === '') {
            errors.push(2);
        }
        // Check deathdate
        if (personFormInput.isDead) {
            if (new Date(personFormInput.birthDate) > new Date(personFormInput.deathDate)) {
                errors.push(3); // Error == Deathdate can not be bigger than the birthdate
            }
            if (new Date(personFormInput.deathDate) > new Date(getToday())) {
                errors.push(4); // Error == Deathdate can not be bigger than the date today
            }
            if (personFormInput.deathDate === '') {
                errors.push(5);
            }
        }
        // Check mother
        if (personFormOptions.hasMother) {
            if (personFormInput.motherId === '') {
                errors.push(6); // Error == Mother cannot be empty
            } else {
                if (age >= personFormOptions.motherAge) {
                    errors.push(7); // Error == Parent cannot be younger than child
                }
            }
        }
        // Check father
        if (personFormOptions.hasFather) {
            if (personFormInput.fatherId === '') {
                errors.push(8); // Error == Father cannot be empty
            } else {
                if (age >= personFormOptions.fatherAge) {
                    errors.push(9); // Error == Parent cannot be younger than child
                }
            }
        }
        setErrorCodes(errors);
        if (errors.length === 0) {
            postData();
        }
    };

    const postData = () => {
        if (errorCodes.length === 0) {
            /* let name = nameRef.current.value;
            let personGender = gender;
            let bday = birthDateRef.current.value.replace(/-/g, '/');
            let dead;
            let dday;
            let family = familyId;
            let mother;
            let father;
            if (dead) {
                dead = true;
                dday = deathDateRef.current.value.replace(/-/g, '/');
            } else {
                dead = false;
                dday = null;
            }
            if (hasMother) {
                mother = motherId;
            } else {
                mother = null;
            }
            if (hasFather) {
                father = fatherId;
            } else {
                mother = null;
            }
            addPerson(name, personGender, bday, dead, dday, family, mother, father);
            setAlert(true); */
            console.log('workd');
        }
    };

    const submitData = () => {
        checkForErrors();
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

    useEffect(() => {
        console.log('input ', personFormInput);
        console.log('options ', personFormOptions);
    }, [personFormInput, personFormOptions]);

    let deathdayClass;
    if (personFormInput.isDead) {
        deathdayClass = 'addition-person-input-wrap';
    } else {
        deathdayClass = 'addition-person-input-wrap death-day';
    }

    return (
        <div className="addition-page-wrap">
            {redirect && <Redirect to="/viewall" />}
            <Alert text="Person added successfully" open={alert} handleClose={() => setRedirect(true)} />
            <div className="addition-content-wrap">
                <div className="addition-title">Add new person</div>
                <div className="addition-person-wrap">
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-input-1">Name</label>
                        </div>
                        <input
                            id="addition-person-input-1"
                            className="addition-person-input"
                            value={personFormInput.name}
                        />
                    </div>
                    <div className="addition-person-input-wrap person-input-radio">
                        <input
                            type="radio"
                            id="male"
                            className="person-radio"
                            name="gender"
                            value="male"
                            onChange={genderValueHandler}
                            defaultChecked
                        />
                        <label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="female"
                            className="person-radio"
                            name="gender"
                            value="female"
                            onChange={genderValueHandler}
                        />
                        <label htmlFor="female">Female</label>
                        <br />
                    </div>
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-input-2">Birthday</label>
                        </div>
                        <input
                            type="date"
                            id="addition-person-input-2"
                            className="addition-person-input"
                            max={getToday()}
                            value={personFormInput.birthDate}
                            onChange={birthDateHandler}
                        />
                    </div>
                    <div className="addition-person-input-wrap person-input-check">
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-checkbox">Dead</label>
                        </div>
                        <input
                            type="checkbox"
                            id="addition-person-checkbox"
                            className="addition-person-checkbox"
                            checked={personFormInput.isDead}
                            onChange={() => setPersonFormInput({ ...personFormInput, isDead: !personFormInput.isDead })}
                        />
                    </div>
                    <div className={deathdayClass}>
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-input-3">Deathday</label>
                        </div>
                        <input
                            type="date"
                            id="addition-person-input-3"
                            className="addition-person-input"
                            max={getToday()}
                            value={personFormInput.deathDate}
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <FamilyDropdown families={families} handleChange={familyValueHandler} />
                    </div>
                    <div className="addition-person-input-wrap person-input-check">
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-checkbox-4">Mother known</label>
                        </div>
                        <input
                            type="checkbox"
                            id="addition-person-checkbox-4"
                            className="addition-person-checkbox"
                            checked={personFormOptions.hasMother}
                            onClick={() =>
                                setPersonFormOptions({ ...personFormOptions, hasMother: !personFormOptions.hasMother })
                            }
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-input-5">Mother</label>
                        </div>
                        <input
                            id="addition-person-input-5"
                            className="addition-person-input"
                            placeholder="Search..."
                            name="mother-search"
                            value={personFormOptions.motherQuery}
                            onChange={parentValueHandler}
                        />
                        <br />
                    </div>
                    <div className="addition-person-input-wrap">
                        <ParentDropdown
                            familiyId={personFormInput.familyId}
                            parents={personFormOptions.possibleMothers}
                            onChange={motherValueHandler}
                            gender="female"
                        />
                    </div>
                    <div className="addition-person-input-wrap person-input-check">
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-checkbox-6">Father known</label>
                        </div>
                        <input
                            type="checkbox"
                            name="addition-person-checkbox"
                            id="addition-person-checkbox-6"
                            className="addition-person-checkbox"
                            checked={personFormOptions.hasFather}
                            onClick={() =>
                                setPersonFormOptions({ ...personFormOptions, hasFather: !personFormOptions.hasFather })
                            }
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label htmlFor="addition-person-input-7">Father</label>
                        </div>
                        <input
                            id="addition-person-input-7"
                            className="addition-person-input"
                            placeholder="Search..."
                            name="father-search"
                            value={personFormOptions.fatherQuery}
                            onChange={parentValueHandler}
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <ParentDropdown
                            familiyId={personFormInput.familyId}
                            parents={personFormOptions.possibleMothers}
                            onChange={fatherValueHandler}
                            gender="male"
                        />
                    </div>
                    <div className="p-addition-btn">
                        <ButtonBigAlt text="Submit" handleClick={submitData} />
                    </div>
                    <div className="p-addition-error">
                        <ErrorBox errors={errorCodes} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonAdditionPage;
