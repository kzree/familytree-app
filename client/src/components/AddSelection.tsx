import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonBigAlt } from './Button';

const AddSelection = () => (
    <div className="add-selection">
        <div className="add-selection__title">Select action</div>
        <div className="add-selection__btns">
            <div className="add-selection__btn-wrap">
                <Link to={'/add/person'}>
                    <ButtonBigAlt text="Add Person" />
                </Link>
            </div>
            <div className="add-selection__btn-wrap">
                <Link to={'/add/family'}>
                    <ButtonBigAlt text="Add Family" />
                </Link>
            </div>
        </div>
    </div>
);

export default AddSelection;
