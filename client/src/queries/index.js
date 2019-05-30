import { gql } from 'apollo-boost';

const getNewsQuery = gql`
    {
        newsfeed {
            title
            url
        }
    }
`;

export { getNewsQuery };