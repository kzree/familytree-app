import React, { PureComponent } from 'react';
import { PersonType } from '../types/PersonType';
import { FamilyType } from '../types/FamilyType';
import { searchPeopleByQuery, getById, addPerson } from '../services/personService';
import { getAll } from '../services/familyService';
import { ButtonBigAlt } from '../components/Button';
import { calculateAgeByPerson, calculateAgeByParams, getToday } from '../services/util';
import ErrorBox from '../components/ErrorBox';
import { Redirect } from 'react-router-dom';
import Alert from '../components/Alert';

interface state {
    dead: boolean;
    hasMother: boolean;
    hasFather: boolean;
    possibleMothers: PersonType[];
    possibleFathers: PersonType[];
    families: FamilyType[];
    familyId: string;
    motherId: string;
    fatherId: string;
    motherAge: number;
    fatherAge: number;
    gender: string;
    errorCodes: number[];
    redirect: boolean;
    alert: boolean;
}

export default class PersonAdditionPage extends PureComponent<{}, state> {
    nameRef: React.RefObject<HTMLInputElement>;
    birthDateRef: React.RefObject<HTMLInputElement>;
    deathDateRef: React.RefObject<HTMLInputElement>;
    motherRef: React.RefObject<HTMLInputElement>;
    fatherRef: React.RefObject<HTMLInputElement>;

    constructor(props: Readonly<{}>) {
        super(props);

        this.nameRef = React.createRef();
        this.birthDateRef = React.createRef();
        this.deathDateRef = React.createRef();
        this.motherRef = React.createRef();
        this.fatherRef = React.createRef();

        this.state = {
            dead: false,
            hasMother: false,
            hasFather: false,
            possibleMothers: [],
            possibleFathers: [],
            families: [],
            familyId: '',
            motherId: '',
            fatherId: '',
            motherAge: 0,
            fatherAge: 0,
            gender: 'male',
            errorCodes: [],
            redirect: false,
            alert: false
        };
    }

    toggleDead = () => {
        this.setState({
            dead: !this.state.dead
        });
    };

    toggleMother = () => {
        this.setState({
            hasMother: !this.state.hasMother
        });
    };

    toggleFather = () => {
        this.setState({
            hasFather: !this.state.hasFather
        });
    };

    handleParentSearch = async (mother: boolean, allowed: boolean) => {
        let searchQuery;
        // Remove unnecessary spaces
        if (mother) {
            searchQuery = this.motherRef.current.value.replace(/ +(?= )/g, '');
        } else {
            searchQuery = this.fatherRef.current.value.replace(/ +(?= )/g, '');
        }
        // Error checking
        if (searchQuery !== '' && searchQuery !== ' ' && allowed) {
            // Removing error causing symbol
            await searchPeopleByQuery(searchQuery.replace('+', '')).then(data => {
                if (mother) {
                    this.setState({
                        possibleMothers: data
                    });
                } else {
                    this.setState({
                        possibleFathers: data
                    });
                }
            });
        } else {
            if (mother) {
                this.setState({
                    possibleMothers: []
                });
            } else {
                this.setState({
                    possibleFathers: []
                });
            }
        }
    };

    fetchFamilyList = async () => {
        await getAll().then(data => {
            this.setState({
                families: data,
                familyId: data[0].id
            });
        });
    };

    familyValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            familyId: e.currentTarget.value,
            motherId: '',
            fatherId: ''
        });
    };

    motherValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            motherId: e.currentTarget.value
        });
        if (e.currentTarget.value !== '') {
            this.getParentAge(e.currentTarget.value);
        }
    };

    fatherValueHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            fatherId: e.currentTarget.value
        });
        if (e.currentTarget.value !== '') {
            this.getParentAge(e.currentTarget.value);
        }
    };

    genderValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            gender: e.currentTarget.value
        });
    };

    getParentAge = async (id: string) => {
        await getById(id).then(data => {
            if (data.gender === 'male') {
                this.setState({
                    fatherAge: calculateAgeByPerson(data)
                });
            } else if (data.gender === 'female') {
                this.setState({
                    motherAge: calculateAgeByPerson(data)
                });
            }
        });
    };

    logData = () => {
        console.log('Name', this.nameRef.current.value);
        console.log('Gender', this.state.gender);
        console.log('Birthday', this.birthDateRef.current.value);
        console.log('Dead', this.state.dead);
        if (this.state.dead) console.log(this.deathDateRef.current.value);
        console.log('Family', this.state.familyId);
        console.log('Mother', this.state.motherId);
        console.log('Father', this.state.fatherId);
    };

    checkForErrors = async () => {
        let errors = [];
        // Start error checking
        const name = this.nameRef.current.value.replace(/ +(?= )/g, '');
        if (name.length === 0 || name === ' ') {
            errors.push(0); // Error == Name cannot be empty
        }
        // Parent check
        let age = calculateAgeByParams(
            this.birthDateRef.current.value,
            this.deathDateRef.current.value,
            this.state.dead
        );
        // Check birthdate
        if (new Date(this.birthDateRef.current.value) > new Date(getToday())) {
            errors.push(1); // Error == Birthdate can not be bigger than the date today
        }
        if (this.birthDateRef.current.value === '') {
            errors.push(2);
        }
        // Check deathdate
        if (this.state.dead) {
            if (new Date(this.birthDateRef.current.value) > new Date(this.deathDateRef.current.value)) {
                errors.push(3); // Error == Deathdate can not be bigger than the birthdate
            }
            if (new Date(this.deathDateRef.current.value) > new Date(getToday())) {
                errors.push(4); // Error == Deathdate can not be bigger than the date today
            }
            if (this.deathDateRef.current.value === '') {
                errors.push(5);
            }
        }
        // Check mother
        if (this.state.hasMother) {
            if (this.state.motherId === '') {
                errors.push(6); // Error == Mother cannot be empty
            } else {
                if (age >= this.state.motherAge) {
                    errors.push(7); // Error == Parent cannot be younger than child
                }
            }
        }
        // Check father
        if (this.state.hasFather) {
            if (this.state.fatherId === '') {
                errors.push(8); // Error == Father cannot be empty
            } else {
                if (age >= this.state.fatherAge) {
                    errors.push(9); // Error == Parent cannot be younger than child
                }
            }
        }
        this.setState(
            {
                errorCodes: errors
            },
            () => this.postData()
        );
    };

    postData = () => {
        if (this.state.errorCodes.length === 0) {
            let name = this.nameRef.current.value;
            let gender = this.state.gender;
            let bday = this.birthDateRef.current.value.replace(/-/g, '/');
            let dead;
            let dday;
            let family = this.state.familyId;
            let mother;
            let father;
            if (this.state.dead) {
                dead = true;
                dday = this.deathDateRef.current.value.replace(/-/g, '/');
            } else {
                dead = false;
                dday = null;
            }
            if (this.state.hasMother) {
                mother = this.state.motherId;
            } else {
                mother = null;
            }
            if (this.state.hasFather) {
                father = this.state.fatherId;
            } else {
                mother = null;
            }
            addPerson(name, gender, bday, dead, dday, family, mother, father);
            this.setState({
                alert: true
            });
        }
    };

    redirect = () => {
        this.setState({
            redirect: true
        });
    };

    submitData = () => {
        this.logData();
        this.checkForErrors();
    };

    componentDidMount = () => {
        this.fetchFamilyList();
        this.setState({
            errorCodes: []
        });
    };

    render() {
        let deathdayClass;
        if (this.state.dead) {
            deathdayClass = 'addition-person-input-wrap';
        } else {
            deathdayClass = 'addition-person-input-wrap death-day';
        }
        if (this.state.redirect) {
            return <Redirect to="/viewall" />;
        }
        return (
            <div className="addition-page-wrap">
                <Alert text="Person added successfully" open={this.state.alert} handleClose={this.redirect} />
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
                                ref={this.nameRef}
                            />
                        </div>
                        <div className="addition-person-input-wrap person-input-radio">
                            <input
                                type="radio"
                                id="male"
                                className="person-radio"
                                name="gender"
                                value="male"
                                onChange={this.genderValueHandler}
                                defaultChecked
                            />
                            <label>Male</label>
                            <input
                                type="radio"
                                id="female"
                                className="person-radio"
                                name="gender"
                                value="female"
                                onChange={this.genderValueHandler}
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
                                ref={this.birthDateRef}
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
                                checked={this.state.dead}
                                onClick={this.toggleDead}
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
                                ref={this.deathDateRef}
                            />
                        </div>
                        <div className="addition-person-input-wrap">
                            <div className="addition-person-input-label">
                                <label>Family</label>
                            </div>
                            <FamilyDropdown families={this.state.families} handleChange={this.familyValueHandler} />
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
                                checked={this.state.hasMother}
                                onClick={this.toggleMother}
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
                                ref={this.motherRef}
                                onChange={() => this.handleParentSearch(true, this.state.hasMother)}
                            />
                            <br />
                        </div>
                        <div className="addition-person-input-wrap">
                            <ParentDropdown
                                familiyId={this.state.familyId}
                                parents={this.state.possibleMothers}
                                onChange={this.motherValueHandler}
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
                                checked={this.state.hasFather}
                                onClick={this.toggleFather}
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
                                ref={this.fatherRef}
                                onChange={() => this.handleParentSearch(false, this.state.hasFather)}
                            />
                        </div>
                        <div className="addition-person-input-wrap">
                            <ParentDropdown
                                familiyId={this.state.familyId}
                                parents={this.state.possibleFathers}
                                onChange={this.fatherValueHandler}
                                gender="male"
                            />
                        </div>
                        <div className="p-addition-btn">
                            <ButtonBigAlt text="Submit" handleClick={this.submitData} />
                        </div>
                        <div className="p-addition-error">
                            <ErrorBox errors={this.state.errorCodes} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface familyDropdownProps {
    families: FamilyType[];
    handleChange: any;
}

const FamilyDropdown = (props: familyDropdownProps) => {
    return (
        <>
            <select id="families" onChange={props.handleChange}>
                {props.families.map((item, i) => {
                    return (
                        <option value={item.id} key={i}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

const ParentDropdown = (props: { parents: PersonType[]; onChange: any; familiyId: string; gender: string }) => {
    if (props.parents.length > 0) {
        return (
            <>
                <div className="addition-person-input-label">
                    <label>Select</label>
                </div>
                <select id="parents" onChange={props.onChange}>
                    <option value="">Please select</option>
                    {props.parents.map((item, i) => {
                        const age = calculateAgeByPerson(item);
                        if (props.familiyId === item.family && props.gender === item.gender) {
                            return (
                                <option value={item.id} key={i}>
                                    {item.name}
                                    {', '}
                                    {age}
                                </option>
                            );
                        }
                    })}
                </select>
            </>
        );
    } else {
        return null;
    }
};
