import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const AddSelection = () => (
    <div className="add-selection">
        <div className="add-selection__title">Select action</div>
        <div className="add-selection__btns">
            <div className="add-selection__btn-wrap">
                <Link to={'/add/person'}>
                    <Button buttonText="Add Person" size="big" theme="alt" />
                </Link>
            </div>
            <div className="add-selection__btn-wrap">
                <Link to={'/add/family'}>
                    <Button buttonText="Add Famiy" size="big" theme="alt" />
                </Link>
            </div>
        </div>
    </div>
);

export default AddSelection;
