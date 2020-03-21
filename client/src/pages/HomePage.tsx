import React, { PureComponent } from 'react';
import { getAll } from '../services/personService';
import { PersonType } from '../types/PersonType';

export default class HomePage extends PureComponent {
    items: PersonType[];
    constructor(props: Readonly<{}>) {
        super(props);
        this.items = [];
    }

    fetch = async () => {
        await getAll().then(data => {
            for (let i = 0; i < data.length; i++) {
                this.items[i] = data[i];
            }
        });

        console.log(this.items);
    };

    render() {
        return (
            <div className="tester">
                <button onClick={this.fetch}>Click me</button>
            </div>
        );
    }
}
