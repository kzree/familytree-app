import React, { PureComponent } from 'react';
import { PersonHeader } from '../components/Person';
import PeopleTable from '../components/PeopleTable';
import { PersonType } from '../types/PersonType';
import IdFromUrl from '../types/urlParamTypes';
import { getByFamilyId } from '../services/personService';

const FamilyPanel = () => {
    return (
        <div className="people-content-panel">
            <div className="people-content-panel-head">
                <div className="people-content-panel-head-t">
                    List of family
                </div>
            </div>
        </div>
    );
};

interface FamilyPageState {
    items: PersonType[];
    familyid: string;
}

export default class FamilyPage extends PureComponent<
    IdFromUrl,
    FamilyPageState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            familyid: ''
        };
    }

    componentDidMount = () => {
        this.init();
    };

    componentDidUpdate = () => {
        if (this.state.familyid !== this.props.match.params.id) {
            this.init();
        }
    };

    init = async () => {
        let fId: string = this.props.match.params.id;
        await getByFamilyId(fId).then(data => {
            this.setState({
                items: data,
                familyid: fId
            });
        });
    };

    render() {
        return (
            <div className="people-wrap">
                <div className="people-content-wrap">
                    <FamilyPanel />
                    <PersonHeader />

                    <div className="people-table-wrap">
                        <PeopleTable visiblePeople={this.state.items} />
                    </div>
                </div>
            </div>
        );
    }
}
