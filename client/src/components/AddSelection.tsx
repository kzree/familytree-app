import React from 'react';
import { ButtonBigAlt } from './Button';

const AddSelection = () => {
    return (
        <div className="add-select-wrap">
            <div className="add-select-title">Select action</div>
            <div className="add-select-btns">
                <div className="add-select-btn-wrap">
                    <ButtonBigAlt text="Add Person" />
                </div>
                <div className="add-select-btn-wrap">
                    <ButtonBigAlt text="Add Family" />
                </div>
            </div>
        </div>
    );
};

export default AddSelection;
