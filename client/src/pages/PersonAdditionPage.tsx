import React, { useState, useEffect } from 'react';
import { PersonType } from '../types/PersonType';
import { FamilyType } from '../types/FamilyType';
import { searchPeopleByQuery, getById, addPerson } from '../services/personService';
import { getAll } from '../services/familyService';
import { ButtonBigAlt } from '../components/Button';
import { calculateAgeByPerson, calculateAgeByParams, getToday } from '../services/util';
import ErrorBox from '../components/ErrorBox';
import { Redirect } from 'react-router-dom';
import Alert from '../components/Alert';
import { FamilyDropdown, ParentDropdown } from '../components/Dropdowns';

export const PersonAdditionPage = () => {
    const nameRef: React.RefObject<HTMLInputElement> = React.createRef();
    const birthDateRef: React.RefObject<HTMLInputElement> = React.createRef();
    const deathDateRef: React.RefObject<HTMLInputElement> = React.createRef();
    const motherRef: React.RefObject<HTMLInputElement> = React.createRef();
    const fatherRef: React.RefObject<HTMLInputElement> = React.createRef();

    // Hooks
    const [dead, setDead] = useState(false);
    const [hasMother, setHasMother] = useState(false);
    const [hasFather, setHasFather] = useState(false);
    const [possibleMothers, setPossibleMothers] = useState<PersonType[]>([]);
    const [possibleFathers, setPossibleFathers] = useState<PersonType[]>([]);
    const [families, setFamilies] = useState<FamilyType[]>([]);
    const [familyId, setFamilyId] = useState<string>('');
    const [motherId, setMotherId] = useState<string>('');
    const [fatherId, setFatherId] = useState<string>('');
    const [motherAge, setMotherAge] = useState<number>(0);
    const [fatherAge, setFatherAge] = useState<number>(0);
    const [gender, setGender] = useState<string>('male');
    const [errorCodes, setErrorCodes] = useState<number[]>([]);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    const handleParentSearch = async (mother: boolean, allowed: boolean) => {
        let searchQuery;
        // Remove unnecessary spaces
        if (mother) {
            searchQuery = motherRef.current.value.replace(/ +(?= )/g, '');
        } else {
            searchQuery = fatherRef.current.value.replace(/ +(?= )/g, '');
        }
        // Error checking
        if (searchQuery !== '' && searchQuery !== ' ' && allowed) {
            // Removing error causing symbol
            await searchPeopleByQuery(searchQuery.replace('+', '')).then((data) => {
                if (mother) {
                    setPossibleMothers(data);
                } else {
                    setPossibleFathers(data);
                }
            });
        } else {
            if (mother) {
                setPossibleMothers([]);
            } else {
                setPossibleFathers([]);
            }
        }
    };

    const familyValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setFamilyId(e.currentTarget.value);
        resetParents();
    };

    const resetParents = () => {
        setMotherId('');
        setFatherId('');
    };

    const motherValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setMotherId(e.currentTarget.value);
        if (e.currentTarget.value !== '') {
            getParentAge(e.currentTarget.value);
        }
    };

    const fatherValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setFatherId(e.currentTarget.value);

        if (e.currentTarget.value !== '') {
            getParentAge(e.currentTarget.value);
        }
    };

    const genderValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.currentTarget.value);
    };

    const getParentAge = async (id: string) => {
        await getById(id).then((data) => {
            if (data.gender === 'male') {
                setFatherAge(calculateAgeByPerson(data));
            } else if (data.gender === 'female') {
                setMotherAge(calculateAgeByPerson(data));
            }
        });
    };

    const logData = () => {
        console.log('Name', nameRef.current.value);
        console.log('Gender', gender);
        console.log('Birthday', birthDateRef.current.value);
        console.log('Dead', dead);
        if (dead) console.log(deathDateRef.current.value);
        console.log('Family', familyId);
        console.log('Mother', motherId);
        console.log('Father', fatherId);
    };

    const checkForErrors = async () => {
        let errors = [];
        // Start error checking
        const name = nameRef.current.value.replace(/ +(?= )/g, '');
        if (name.length === 0 || name === ' ') {
            errors.push(0); // Error == Name cannot be empty
        }
        // Parent check
        let age = calculateAgeByParams(birthDateRef.current.value, deathDateRef.current.value, dead);
        // Check birthdate
        if (new Date(birthDateRef.current.value) > new Date(getToday())) {
            errors.push(1); // Error == Birthdate can not be bigger than the date today
        }
        if (birthDateRef.current.value === '') {
            errors.push(2);
        }
        // Check deathdate
        if (dead) {
            if (new Date(birthDateRef.current.value) > new Date(deathDateRef.current.value)) {
                errors.push(3); // Error == Deathdate can not be bigger than the birthdate
            }
            if (new Date(deathDateRef.current.value) > new Date(getToday())) {
                errors.push(4); // Error == Deathdate can not be bigger than the date today
            }
            if (deathDateRef.current.value === '') {
                errors.push(5);
            }
        }
        // Check mother
        if (hasMother) {
            if (motherId === '') {
                errors.push(6); // Error == Mother cannot be empty
            } else {
                if (age >= motherAge) {
                    errors.push(7); // Error == Parent cannot be younger than child
                }
            }
        }
        // Check father
        if (hasFather) {
            if (fatherId === '') {
                errors.push(8); // Error == Father cannot be empty
            } else {
                if (age >= fatherAge) {
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
            let name = nameRef.current.value;
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
            setAlert(true);
        }
    };

    const submitData = () => {
        checkForErrors();
        logData();
    };

    useEffect(() => {
        const fetchFamilyList = async () => {
            await getAll().then((data) => {
                setFamilies(data);
                setFamilyId(data[0].id);
            });
        };

        if (families.length === 0) {
            fetchFamilyList();
        }
    }, [families]);

    let deathdayClass;
    if (dead) {
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
                            <label>Name</label>
                        </div>
                        <input
                            type="text"
                            name="addition-person-input"
                            id="addition-person-input-1"
                            className="addition-person-input"
                            ref={nameRef}
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
                        <label>Male</label>
                        <input
                            type="radio"
                            id="female"
                            className="person-radio"
                            name="gender"
                            value="female"
                            onChange={genderValueHandler}
                        />
                        <label>Female</label>
                        <br />
                    </div>
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label>Birthday</label>
                        </div>
                        <input
                            type="date"
                            name="addition-person-bday"
                            id="addition-person-input-2"
                            className="addition-person-input"
                            max={getToday()}
                            defaultValue={getToday()}
                            ref={birthDateRef}
                        />
                    </div>
                    <div className="addition-person-input-wrap person-input-check">
                        <div className="addition-person-input-label">
                            <label>Dead</label>
                        </div>
                        <input
                            type="checkbox"
                            name="addition-person-checkbox"
                            id="addition-person-checkbox"
                            className="addition-person-checkbox"
                            checked={dead}
                            onClick={() => setDead(!dead)}
                        />
                    </div>
                    <div className={deathdayClass}>
                        <div className="addition-person-input-label">
                            <label>Deathday</label>
                        </div>
                        <input
                            type="date"
                            name="addition-person-dday"
                            id="addition-person-input-3"
                            className="addition-person-input"
                            max={getToday()}
                            ref={deathDateRef}
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label>Family</label>
                        </div>
                        <FamilyDropdown families={families} handleChange={familyValueHandler} />
                    </div>
                    <div className="addition-person-input-wrap person-input-check">
                        <div className="addition-person-input-label">
                            <label>Mother known</label>
                        </div>
                        <input
                            type="checkbox"
                            name="addition-person-checkbox"
                            id="addition-person-checkbox-4"
                            className="addition-person-checkbox"
                            checked={hasMother}
                            onClick={() => setHasMother(!hasMother)}
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label>Mother</label>
                        </div>
                        <input
                            type="text"
                            name="addition-person-input"
                            id="addition-person-input-5"
                            className="addition-person-input"
                            placeholder="Search..."
                            ref={motherRef}
                            onChange={() => handleParentSearch(true, hasMother)}
                        />
                        <br />
                    </div>
                    <div className="addition-person-input-wrap">
                        <ParentDropdown
                            familiyId={familyId}
                            parents={possibleMothers}
                            onChange={motherValueHandler}
                            gender="female"
                        />
                    </div>
                    <div className="addition-person-input-wrap person-input-check">
                        <div className="addition-person-input-label">
                            <label>Father known</label>
                        </div>
                        <input
                            type="checkbox"
                            name="addition-person-checkbox"
                            id="addition-person-checkbox-6"
                            className="addition-person-checkbox"
                            checked={hasFather}
                            onClick={() => setHasFather(!hasFather)}
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <div className="addition-person-input-label">
                            <label>Father</label>
                        </div>
                        <input
                            type="text"
                            name="addition-person-input"
                            id="addition-person-input-7"
                            className="addition-person-input"
                            placeholder="Search..."
                            ref={fatherRef}
                            onChange={() => handleParentSearch(false, hasFather)}
                        />
                    </div>
                    <div className="addition-person-input-wrap">
                        <ParentDropdown
                            familiyId={familyId}
                            parents={possibleFathers}
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
