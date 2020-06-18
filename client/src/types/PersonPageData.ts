import { PersonType } from './PersonType';

interface PersonPageData {
    parent1: PersonType;
    parent2: PersonType;
    children: PersonType[];
    siblings: PersonType[];
    childNumber: number;
    relativesAmount: number;
}

export default PersonPageData;
