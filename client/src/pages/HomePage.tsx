import React, { PureComponent } from 'react';
import { getAll } from '../services/personService';
import { PersonType } from '../types/PersonType';
import '../style/HomePage.css';

export default class HomePage extends PureComponent {
    items: PersonType[];
    constructor(props: Readonly<{}>) {
        super(props);
        this.items = [];
    }

    fetchAll = async () => {
        await getAll().then(data => {
            for (let i = 0; i < data.length; i++) {
                this.items[i] = data[i];
            }
        });

        console.log(this.items);
    };

    render() {
        return (
            <div className="t">
                <div className="s">Andrei</div>
            </div>
        );
    }
}
