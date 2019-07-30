import { gql } from 'apollo-boost';

const getNewsQuery = gql`
    query GetNews($query: String) {
        newsfeed(query: $query) {
            id
            title
            author
            url
            points
        }
    }
`;

export { getNewsQuery };