const graphql = require('graphql');
const HackerNewsAPI = require('../models/HackerNewsAPI');

const hackerNewsAPI = new HackerNewsAPI()

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const NewsfeedType = new GraphQLObjectType({
    name: 'NewsfeedType',
    fields: () => ({
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        url: { type: GraphQLString },
        id: { type: GraphQLID },
        points: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        newsfeed: {
            type: new GraphQLList(NewsfeedType),
            args: {
                query: { type: GraphQLString },
                page: { type: GraphQLInt },
            },
            resolve(parent, args) {
                return hackerNewsAPI.getNewsfeed(args.query, args.page);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});