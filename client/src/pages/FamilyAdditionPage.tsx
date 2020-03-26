import React, { PureComponent } from 'react';
import { ButtonBigAlt } from '../components/Button';
import { newFamily } from '../services/familyService';
import { Redirect } from 'react-router-dom';

interface state {
    redirect: boolean;
}

export default class FamilyAdditionPage extends PureComponent<{}, state> {
    newFamily: React.RefObject<HTMLInputElement>;
    constructor(props: Readonly<{}>) {
        super(props);
        this.newFamily = React.createRef();

        this.state = {
            redirect: false
        };
    }

    submitNewFamily = async () => {
        // TODO: Put this into an utility file
        // Remove unnecessary spaces
        let newFamilyName = this.newFamily.current.value.replace(
            / +(?= )/g,
            ''
        );
        // Error checking
        if (newFamilyName !== '' && newFamilyName !== ' ') {
            newFamily(this.newFamily.current.value).then(() =>
                this.setState({
                    redirect: true
                })
            );
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/viewall/families" />;
        }
        return (
            <div className="addition-page-wrap">
                <div className="addition-content-wrap">
                    <div className="addition-title">Add new family</div>
                    <div className="f-addition-input-wrap">
                        <input
                            type="text"
                            name="addition-input"
                            id="addition-input"
                            className="addition-input"
                            placeholder="Enter family name..."
                            ref={this.newFamily}
                        />
                    </div>
                    <div className="f-addition-btn">
                        <ButtonBigAlt
                            text="Submit"
                            handleClick={this.submitNewFamily}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
