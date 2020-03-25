import { RouteComponentProps } from 'react-router-dom';

type PathParamsIdType = {
    id: string;
};

type IdFromUrl = RouteComponentProps<PathParamsIdType> & {
    someString: string;
};

export default IdFromUrl;
