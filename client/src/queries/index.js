import { gql } from 'apollo-boost';

const getNewsQuery = gql`
    query GetNews($query: String, $page: Int) {
        newsfeed(query: $query, page: $page) {
            id
            title
            author
            url
            points
        }
    }
`;

export { getNewsQuery };