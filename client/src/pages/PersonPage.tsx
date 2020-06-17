import React, { useState, useEffect } from 'react';
import { PersonType } from '../types/PersonType';
import { getById, getByFamilyId, getChildren, getSiblings, deleteById } from '../services/personService';
import { Link, Redirect } from 'react-router-dom';
import { ButtonSmallAlt } from '../components/Button';
import IdFromUrl from '../types/urlParamTypes';
import Alert from '../components/Alert';
import { createEmptyPerson, calculateAgeByParams } from '../services/util';
import Confirmation from '../components/Confirmation';

export const PersonPage = (props: IdFromUrl) => {
    const [key, setKey] = useState<string>('');
    const [person, setPerson] = useState<PersonType>(createEmptyPerson());
    const [age, setAge] = useState<number>(null);
    const [parent1, setParent1] = useState<PersonType>(createEmptyPerson());
    const [parent2, setParent2] = useState<PersonType>(createEmptyPerson());
    const [children, setChildren] = useState<PersonType[]>([]);
    const [siblings, setSiblings] = useState<PersonType[]>([]);
    const [childNumber, setChildNumber] = useState<number>(0);
    const [alert, setAlert] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [status, setStatus] = useState<String>('Alive');
    const [relativesAmount, setRelativesAmount] = useState<number>(0);

    const init = () => {
        let pId: string = props.match.params.id;
        getById(pId).then((data) => {
            setPerson(data);
        });
        console.log('why');
    };

    const deleteThisPerson = () => {
        deleteById(person.id);
        setRedirect(true);
    };

    useEffect(() => {
        if (person.id !== props.match.params.id) {
            init();
        }
    });

    useEffect(() => {
        const checkIfDead = () => {
            if (person.dead) {
                const tempPerson: PersonType = person;
                tempPerson.name = '✝' + person.name;
                setPerson(tempPerson);
                setStatus('Deceased (' + person.deathDate + ')');
            }
        };

        const calculateAge = () => {
            if (person !== null) {
                if (person.birthDate !== '') {
                    setAge(calculateAgeByParams(person.birthDate, person.deathDate, person.dead));
                }
            }
        };

        const getParents = async () => {
            // Check if parent exists
            if (person !== null) {
                if (person.parent1 !== '' && person.parent1 !== null) {
                    await getById(person.parent1).then((data) => {
                        setParent1(data);
                        if (parent1.dead) {
                            const tempPerson: PersonType = parent1;
                            tempPerson.name = '✝' + parent1.name;
                            setParent1(tempPerson);
                        }
                    });
                } else {
                    const tempPerson: PersonType = createEmptyPerson();
                    tempPerson.name = '-';
                    tempPerson.id = person.id;
                    setParent1(tempPerson);
                }
            } else {
                const tempPerson: PersonType = createEmptyPerson();
                tempPerson.name = '-';
                tempPerson.id = person.id;
                setParent1(tempPerson);
            }
            // Check if parent exists
            if (person !== null) {
                if (person.parent2 !== '' && person.parent2 !== null) {
                    await getById(person.parent2).then((data) => {
                        if (data.dead) {
                            if (parent2.dead) {
                                const tempPerson: PersonType = parent2;
                                tempPerson.name = '✝' + parent2.name;
                                setParent2(tempPerson);
                            }
                        }
                    });
                } else {
                    const tempPerson: PersonType = createEmptyPerson();
                    tempPerson.name = '-';
                    tempPerson.id = person.id;
                    setParent2(tempPerson);
                }
            } else {
                const tempPerson: PersonType = createEmptyPerson();
                tempPerson.name = '-';
                tempPerson.id = person.id;
                setParent2(tempPerson);
            }
        };

        const getRelatives = async () => {
            if (person.family !== '') {
                await getByFamilyId(person.family).then((data) => {
                    setRelativesAmount(data.length - 1);
                });
            }
        };

        const getPersonChildren = async () => {
            if (person.id !== '') {
                await getChildren(person.id).then((data) => {
                    setChildren(data);
                });
            }
        };

        const getPersonSiblings = async () => {
            if (person.id !== '') {
                await getSiblings(person.id).then((data) => {
                    setSiblings(data);
                    getChildNumber();
                });
            }
        };

        const getChildNumber = () => {
            if (siblings.length === 0) {
                setChildNumber(1);
            } else {
                let birthdayDates = [];
                birthdayDates.push(new Date(person.birthDate));
                siblings.forEach((sibling) => {
                    birthdayDates.push(new Date(sibling.birthDate));
                });
                birthdayDates.sort((a, b) => a.getTime() - b.getTime());
                for (let i = 0; i < birthdayDates.length; i++) {
                    if (birthdayDates[i].getTime() === new Date(person.birthDate).getTime()) {
                        setChildNumber(i + 1);
                    }
                }
            }
        };

        if (key !== person.id) {
            checkIfDead();
            getParents();
            getRelatives();
            getPersonChildren();
            getPersonSiblings();
            calculateAge();
            setKey(person.id);
            console.log('work');
        }
    }, [age, key, parent1, parent2, person, person.id, props.match.params.id, siblings]);

    const renderChildren = () => {
        if (children.length > 0) {
            return (
                <>
                    {children.map((item, i) => {
                        return (
                            <li>
                                <Link to={`/person/${item.id}`}>{item.name}</Link>
                            </li>
                        );
                    })}
                </>
            );
        } else {
            return <>None</>;
        }
    };

    const renderSiblings = () => {
        if (siblings.length > 0) {
            return (
                <>
                    {siblings.map((item, i) => {
                        return (
                            <li>
                                <Link to={`/person/${item.id}`}>{item.name}</Link>
                            </li>
                        );
                    })}
                </>
            );
        } else {
            return <>None</>;
        }
    };

    let profileClass = '';
    if (person.gender === 'male') {
        profileClass = 'person-page-info-pic-male';
    } else {
        profileClass = 'person-page-info-pic-female';
    }
    if (redirect) {
        return <Redirect to="/viewall" />;
    }
    return (
        <div className="person-page-wrap">
            {/*prettier-ignore*/}
            <Alert 
                    text="Feature not yet available" 
                    open={alert} 
                    handleClose={() => setAlert(!alert)} 
                />
            <Confirmation
                text="Are you sure you want to delete this person"
                handleClose={() => setConfirm(!confirm)}
                handleOk={deleteThisPerson}
                open={confirm}
            />
            <div className="person-page-content">
                <div className="person-page-info">
                    <div className="person-page-info-pic-wrap">
                        <div className={profileClass}></div>
                    </div>
                    <div className="person-page-info-content">
                        <div className="person-page-info-content-text">{person.name}</div>
                        <div className="person-page-info-content-text">Age: {age}</div>
                    </div>
                </div>
                <div className="person-page-extra">
                    <h1>Information</h1>
                    <div className="person-page-extra-info">
                        <div className="person-page-extra-info-text">Name: {person.name}</div>
                        <div className="person-page-extra-info-text">Age: {age}</div>
                        <div className="person-page-extra-info-text">Birthday: {person.birthDate}</div>
                        <div className="person-page-extra-info-text">Status: {status}</div>
                        <div className="person-page-extra-info-text">
                            Mother: <Link to={`/person/${parent1.id}`}>{parent1.name}</Link>
                        </div>
                        <div className="person-page-extra-info-text">
                            Father: <Link to={`/person/${parent2.id}`}>{parent2.name}</Link>
                        </div>
                        <div className="person-page-extra-info-text"># child of family: {childNumber}</div>
                        <div className="person-page-extra-info-text">
                            Number of documented relatives: {relativesAmount}
                        </div>
                        <div className="person-page-extra-info-text">
                            Children: <br />
                            <div className="person-scroll-content">
                                <ul>{renderChildren()}</ul>
                            </div>
                        </div>
                        <div className="person-page-extra-info-text">
                            Siblings: <br />
                            <div className="person-scroll-content">
                                <ul>{renderSiblings()}</ul>
                            </div>
                        </div>
                    </div>
                    <div className="person-page-edit">
                        <ButtonSmallAlt text="Edit" handleClick={() => setAlert(!alert)} />
                    </div>
                    <div className="person-page-delete">
                        <ButtonSmallAlt text="Delete" handleClick={() => setConfirm(!confirm)} />
                    </div>
                    <div className="person-page-low-panel">
                        <div className="person-page-extra-info-text">
                            <Link to={`/family/${person.family}`}>View all relatives</Link>{' '}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonPage;
