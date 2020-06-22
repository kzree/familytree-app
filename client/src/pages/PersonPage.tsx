import React, { useState, useEffect, useCallback } from 'react';
import { PersonType } from '../types/PersonType';
import { getById, getByFamilyId, getChildren, getSiblings, deleteById } from '../services/personService';
import { Link, Redirect } from 'react-router-dom';
import { ButtonSmallAlt } from '../components/Button';
import IdFromUrl from '../types/urlParamTypes';
import Alert from '../components/Alert';
import { createEmptyPerson, calculateAgeByPerson, initPersonPageData } from '../services/util';
import Confirmation from '../components/Confirmation';
import PersonPageData from '../types/PersonPageData';
import ChildrenList from '../components/ChildrenList';
import SiblingsList from '../components/SiblingsList';

export const PersonPage = (props: IdFromUrl) => {
    const [key, setKey] = useState<string>(null);
    const [person, setPerson] = useState<PersonType>(createEmptyPerson());
    const [personPageData, setPersonPageData] = useState<PersonPageData>(initPersonPageData());
    const [alert, setAlert] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);

    const deleteThisPerson = () => {
        deleteById(person.id);
        setRedirect(true);
    };

    const calculatePersonAge = () => calculateAgeByPerson(person);

    useEffect(() => {
        getById(props.match.params.id).then((data) => {
            setPerson(data);
        });
    }, [props.match.params.id]);

    const getRelatives = useCallback(
        (personPageDataTemp: PersonPageData) => {
            if (person.family) {
                getByFamilyId(person.family).then((data) => {
                    personPageDataTemp.relativesAmount = data.length - 1;
                });
            }
        },
        [person.family]
    );

    const getPersonChildren = useCallback(
        (personPageDataTemp: PersonPageData) => {
            if (person.id) {
                getChildren(person.id).then((data) => {
                    personPageDataTemp.children = data;
                });
            }
        },
        [person.id]
    );

    const getChildNumber = useCallback(
        (personPageDataTemp: PersonPageData) => {
            if (personPageDataTemp.siblings.length === 0) {
                personPageDataTemp.childNumber = 1;
            } else {
                let birthdayDates = [];
                birthdayDates.push(new Date(person.birthDate));
                personPageDataTemp.siblings.forEach((sibling) => {
                    birthdayDates.push(new Date(sibling.birthDate));
                });
                birthdayDates.sort((a, b) => a.getTime() - b.getTime());
                for (let i = 0; i < birthdayDates.length; i++) {
                    if (birthdayDates[i].getTime() === new Date(person.birthDate).getTime()) {
                        personPageDataTemp.childNumber = i + 1;
                    }
                }
            }
        },
        [person.birthDate]
    );

    const getPersonSiblings = useCallback(
        (personPageDataTemp: PersonPageData) => {
            if (person.id) {
                getSiblings(person.id).then((data) => {
                    personPageDataTemp.siblings = data;
                });
            }
        },
        [person.id]
    );

    const getPersonInformation = useCallback(() => {
        let personPageDataTemp = personPageData;

        if (person) {
            // Parent information
            if (person.parent1) {
                getById(person.parent1).then((data) => {
                    personPageDataTemp.parent1 = data;
                });
            } else {
                personPageDataTemp.parent1 = createEmptyPerson();
            }
            if (person.parent2) {
                getById(person.parent2).then((data) => {
                    personPageDataTemp.parent2 = data;
                });
            } else {
                personPageDataTemp.parent2 = createEmptyPerson();
            }

            getRelatives(personPageDataTemp);
            getPersonSiblings(personPageDataTemp);
            getPersonChildren(personPageDataTemp);
            getChildNumber(personPageDataTemp);
        }

        setPersonPageData(personPageDataTemp);
    }, [getChildNumber, getPersonChildren, getPersonSiblings, getRelatives, person, personPageData]);

    useEffect(() => {
        if (key !== person.id) {
            getPersonInformation();
            setKey(person.id);
        }
    }, [getPersonInformation, key, person.id]);

    let profileClass = '';
    if (person.gender === 'male') {
        profileClass = 'person-info__img__content person-info__img__content--male';
    } else {
        profileClass = 'person-info__img__content person-info__img__content--female';
    }
    if (redirect) {
        return <Redirect to="/viewall" />;
    }

    return (
        <div className="person-page">
            <Alert text="Feature not yet available" open={alert} handleClose={() => setAlert(!alert)} />
            <Confirmation
                text="Are you sure you want to delete this person"
                handleClose={() => setConfirm(!confirm)}
                handleOk={deleteThisPerson}
                open={confirm}
            />
            <div className="person-page__content">
                <div className="person-info">
                    <div className="person-info__img">
                        <div className={profileClass}></div>
                    </div>
                    <div className="person-info__content">
                        <div className="person-info__content__text">
                            {person.dead ? `✝ ${person.name}` : person.name}
                        </div>
                        <div className="person-info__content__text">Age: {calculatePersonAge()}</div>
                    </div>
                </div>
                <div className="person-extra">
                    <h1>Information</h1>
                    <div className="person-extra__info">
                        <div className="person-extra__info__text">
                            Name: {person.dead ? `✝ ${person.name}` : person.name}
                        </div>
                        <div className="person-extra__info__text">Age: {calculatePersonAge()}</div>
                        <div className="person-extra__info__text">Birthday: {person.birthDate}</div>
                        <div className="person-extra__info__text">
                            Status: {person.dead ? `Deceased (${person.deathDate})` : 'Alive'}
                        </div>
                        <div className="person-extra__info__text">
                            Mother:{' '}
                            <Link to={`/person/${personPageData.parent1.id}`}>
                                {personPageData.parent1.dead
                                    ? `✝ ${personPageData.parent1.name}`
                                    : personPageData.parent1.name}
                            </Link>
                        </div>
                        <div className="person-extra__info__text">
                            Father:{' '}
                            <Link to={`/person/${personPageData.parent2.id}`}>
                                {personPageData.parent1.dead
                                    ? `✝ ${personPageData.parent2.name}`
                                    : personPageData.parent2.name}
                            </Link>
                        </div>
                        <div className="person-extra__info__text"># child of family: {personPageData.childNumber}</div>
                        <div className="person-extra__info__text">
                            Number of documented relatives: {personPageData.relativesAmount}
                        </div>
                        <div className="person-extra__info__text">
                            Children: <br />
                            <div className="person-extra__info__list">
                                <ChildrenList personPageData={personPageData} />
                            </div>
                        </div>
                        <div className="person-extra__info__text">
                            Siblings: <br />
                            <div className="person-extra__info__list">
                                <SiblingsList personPageData={personPageData} />
                            </div>
                        </div>
                    </div>
                    <div className="person-page__btn person-page__btn--edit">
                        <ButtonSmallAlt text="Edit" handleClick={() => setAlert(!alert)} />
                    </div>
                    <div className="person-page__btn person-page__btn--del">
                        <ButtonSmallAlt text="Delete" handleClick={() => setConfirm(!confirm)} />
                    </div>
                    <div className="person-extra__footer">
                        <div className="person-extra__info__text">
                            <Link to={`/family/${person.family}`}>View all relatives</Link>{' '}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonPage;
