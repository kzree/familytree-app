import React, { Component } from 'react';
import { ButtonBigAlt } from '../components/Button';

export default class FamilyAdditionPage extends Component {
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
                        />
                    </div>
                    <div className="f-addition-btn">
                        <ButtonBigAlt text="Submit" />
                    </div>
                </div>
            </div>
        );
    }
}
