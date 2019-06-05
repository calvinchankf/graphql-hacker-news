import { gql } from 'apollo-boost';

const getNewsQuery = gql`
    {
        newsfeed {
            id
            title
            author
            url
            points
        }
    }
`;

export { getNewsQuery };