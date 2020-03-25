import React, { Component } from 'react';
import { ButtonBigAlt } from '../components/Button';
import { newFamily } from '../services/familyService';

export default class FamilyAdditionPage extends Component {
    newFamily: React.RefObject<HTMLInputElement>;
    constructor(props: Readonly<{}>) {
        super(props);
        this.newFamily = React.createRef();
    }

    submitNewFamily = async () => {
        newFamily(this.newFamily.current.value);
        console.log('Done');
    };

    render() {
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
