import { PersonType } from './PersonType';
import { FamilyType } from './FamilyType';

interface PersonAdditonFormOptions {
    hasMother: boolean;
    hasFather: boolean;
    motherQuery: string;
    fatherQuery: string;
    motherAge: number;
    fatherAge: number;
    families: FamilyType[];
    possibleMothers: PersonType[];
    possibleFathers: PersonType[];
}

export default PersonAdditonFormOptions;
