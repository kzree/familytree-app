import React, { PureComponent } from 'react';
import { FamilyType } from '../types/FamilyType';
import { FamilyHeader } from '../components/Family';
import FamilyTable from '../components/FamilyTable';
import { getAll } from '../services/familyService';
import { Link } from 'react-router-dom';
import { ButtonSmall } from '../components/Button';

interface FamiliesPageState {
    items: FamilyType[];
}

export default class FamiliesPage extends PureComponent<{}, FamiliesPageState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            items: []
        };
    }

    init = async () => {
        await getAll().then(data => {
            this.setState({
                items: data
            });
        });
    };

    componentDidMount = () => {
        this.init();
    };

    render() {
        return (
            <div className="people-wrap">
                <div className="people-content-wrap">
                    <div className="people-content-panel">
                        <div className="people-content-panel-btn">
                            <Link to={'/viewall'}>
                                <ButtonSmall text="People" />
                            </Link>
                        </div>
                        <div className="people-content-panel-head">
                            <div className="people-content-panel-head-t">
                                Families
                            </div>
                        </div>
                    </div>
                    <FamilyHeader />
                    <div className="people-table-wrap">
                        <FamilyTable visibleFamilies={this.state.items} />
                    </div>
                </div>
            </div>
        );
    }
}
