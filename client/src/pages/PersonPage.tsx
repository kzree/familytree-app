import React, { useState, useEffect, useCallback } from 'react';
import { PersonType } from '../types/PersonType';
import { getById, getByFamilyId, getChildren, getSiblings, deleteById } from '../services/personService';
import { Link } from 'react-router-dom';
import IdFromUrl from '../types/urlParamTypes';
import Alert from '../components/Alert';
import { createEmptyPerson, calculateAgeByPerson } from '../services/util';
import Confirmation from '../components/Confirmation';
import ChildrenList from '../components/ChildrenList';
import SiblingsList from '../components/SiblingsList';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';

export const PersonPage = (props: IdFromUrl) => {
    const [key, setKey] = useState<string>(null);
    const [person, setPerson] = useState<PersonType>(createEmptyPerson());
    const [personChildren, setPersonChildren] = useState<PersonType[]>([]);
    const [parent1, setParent1] = useState<PersonType>(createEmptyPerson());
    const [parent2, setParent2] = useState<PersonType>(createEmptyPerson());
    const [relativesAmount, setRelativesAmount] = useState<number>(0);
    const [childNumber, setChildNumber] = useState<number>(0);
    const [siblings, setSiblings] = useState<PersonType[]>([]);
    const [alert, setAlert] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const history = useHistory();

    const deleteThisPerson = () => {
        deleteById(person.id);
        history.push('/viewall');
    };

    const calculatePersonAge = () => calculateAgeByPerson(person);

    const getRelatives = useCallback(() => {
        if (person.family) {
            getByFamilyId(person.family).then((data) => {
                setRelativesAmount(data.length - 1);
            });
        }
    }, [person.family]);

    const getPersonChildren = useCallback(() => {
        if (person.id) {
            getChildren(person.id).then((data) => {
                setPersonChildren(data);
            });
        }
    }, [person.id]);

    const getChildNumber = useCallback(() => {
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
    }, [person.birthDate, siblings]);

    const getPersonSiblings = useCallback(() => {
        if (person.id) {
            getSiblings(person.id).then((data) => {
                setSiblings(data);
            });
        }
    }, [person.id]);

    const getPersonInformation = useCallback(() => {
        if (person) {
            // Parent information
            if (person.parent1) {
                getById(person.parent1).then((data) => {
                    setParent1(data);
                });
            } else {
                setParent1(createEmptyPerson());
            }
            if (person.parent2) {
                getById(person.parent2).then((data) => {
                    setParent2(data);
                });
            } else {
                setParent2(createEmptyPerson());
            }

            getRelatives();
            getPersonSiblings();
            getPersonChildren();
            getChildNumber();
        }
    }, [getChildNumber, getPersonChildren, getPersonSiblings, getRelatives, person]);

    useEffect(() => {
        getById(props.match.params.id).then((data) => {
            setPerson(data);
        });
    }, [props.match.params.id]);

    useEffect(() => {
        if (key !== person.id) {
            getPersonInformation();
            setKey(person.id);
        }
    }, [getPersonInformation, key, person.id]);

    const profileClass =
        person.gender === 'male'
            ? 'person-info__img person-info__img--male'
            : 'person-info__img person-info__img--female';

    if (key === person.id) {
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
                        <div className="person-info__img-wrap">
                            <div className={profileClass}></div>
                        </div>
                        <div className="person-info__content">
                            <div className="person-info__text">{person.dead ? `✝ ${person.name}` : person.name}</div>
                            <div className="person-info__text">Age: {calculatePersonAge()}</div>
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
                                <Link to={`/person/${parent1.id}`}>
                                    {parent1.dead ? `✝ ${parent1.name}` : parent1.name}
                                </Link>
                            </div>
                            <div className="person-extra__info__text">
                                Father:{' '}
                                <Link to={`/person/${parent2.id}`}>
                                    {parent1.dead ? `✝ ${parent2.name}` : parent2.name}
                                </Link>
                            </div>
                            <div className="person-extra__info__text"># child of family: {childNumber}</div>
                            <div className="person-extra__info__text">
                                Number of documented relatives: {relativesAmount}
                            </div>
                            <div className="person-extra__info__text">
                                Children: <br />
                                <div className="person-extra__info__list">
                                    <ChildrenList children={personChildren} />
                                </div>
                            </div>
                            <div className="person-extra__info__text">
                                Siblings: <br />
                                <div className="person-extra__info__list">
                                    <SiblingsList siblings={siblings} />
                                </div>
                            </div>
                        </div>
                        <div className="person-page__btn person-page__btn--edit">
                            <Button handleClick={() => setAlert(!alert)} buttonText="Edit" size="small" theme="alt" />
                        </div>
                        <div className="person-page__btn person-page__btn--del">
                            <Button
                                handleClick={() => setConfirm(!confirm)}
                                buttonText="Delete"
                                size="small"
                                theme="alt"
                            />
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
    } else {
        return null;
    }
};

export default PersonPage;
