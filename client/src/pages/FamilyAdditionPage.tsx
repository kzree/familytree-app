import React, { useState } from 'react';
import { newFamily } from '../services/familyService';
import Alert from '../components/Alert';
import { useHistory } from 'react-router';

export const FamilyAdditionPage = () => {
    const createdFamily: React.RefObject<HTMLInputElement> = React.createRef();
    const [alert, setAlert] = useState<boolean>(false);
    const history = useHistory();

    const submitNewFamily = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newFamilyName = createdFamily.current.value.replace(/ +(?= )/g, '');
        // Error checking
        if (newFamilyName && newFamilyName !== ' ') {
            newFamily(createdFamily.current.value).then(() => setAlert(true));
        }
    };

    return (
        <div className="addition-page">
            <Alert
                text="Family added successfully"
                open={alert}
                handleClose={() => history.push('/viewall/families')}
            />
            <div className="addition-page__content">
                <h2>Add new family</h2>
                <form onSubmit={submitNewFamily} className="family-form">
                    <div className="family-form__input">
                        <input type="text" placeholder="Enter family name..." ref={createdFamily} required/>
                    </div>
                    <div className="family-form__input family-form__submit">
                        <input type="submit" value="Submit" className="submitbtn" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FamilyAdditionPage;
