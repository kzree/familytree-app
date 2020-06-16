import React, { PureComponent, useState } from 'react';
import { ButtonBigAlt } from '../components/Button';
import { newFamily } from '../services/familyService';
import { Redirect } from 'react-router-dom';
import Alert from '../components/Alert';

export const FamilyAdditionPage = () => {
    const createdFamily: React.RefObject<HTMLInputElement> = React.createRef();

    const [redirect, setRedirect] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    const submitNewFamily = async () => {
        let newFamilyName = createdFamily.current.value.replace(/ +(?= )/g, '');
        // Error checking
        if (newFamilyName !== '' && newFamilyName !== ' ') {
            newFamily(createdFamily.current.value).then(() =>
                setAlert(true)
            );
        }
    };

    return (
        <div className="addition-page-wrap">
            <Alert text="Family added successfully" open={alert} handleClose={() => setRedirect(true)} />
            <div className="addition-content-wrap">
                <div className="addition-title">Add new family</div>
                <div className="f-addition-input-wrap">
                    <input
                        type="text"
                        name="addition-input"
                        id="addition-input"
                        className="addition-input"
                        placeholder="Enter family name..."
                        ref={createdFamily}
                    />
                </div>
                <div className="f-addition-btn">
                    <ButtonBigAlt text="Submit" handleClick={submitNewFamily} />
                </div>
            </div>
            {redirect && <Redirect to="/viewall/families" />}
        </div>
    );
}

export default FamilyAdditionPage;