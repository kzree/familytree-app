import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonBigAlt } from './Button';

const AddSelection = () => (
    <div className="add-select-wrap">
        <div className="add-select-title">Select action</div>
        <div className="add-select-btns">
            <div className="add-select-btn-wrap">
                <Link to={'/add/person'}>
                    <ButtonBigAlt text="Add Person" />
                </Link>
            </div>
            <div className="add-select-btn-wrap">
                <Link to={'/add/family'}>
                    <ButtonBigAlt text="Add Family" />
                </Link>
            </div>
        </div>
    </div>
);

export default AddSelection;
