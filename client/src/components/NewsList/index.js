import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { getNewsQuery } from '../../queries';
import SearchBar from '../SearchBar'


class NewsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchKey: "calvin",
        }
    }

    componentDidMount() {
        this.mututeSearchQuery()
    }

    searchOnChange = key => {
        this.setState({
            searchKey: key
        }, () => {
            this.mututeSearchQuery()
        })
    }

    mututeSearchQuery = () => {
        this.props.data.refetch({
            query: this.state.searchKey
        })
    }

    render = () => {

        const { searchKey, page } = this.state

        return (
            <Query
                query={getNewsQuery}
                variables={{ query: searchKey }}
            >
                {({ loading, error, data, fetchMore }) => {
                    if (loading) {
                        return (<div>Loading...</div>)
                    }
                    if (error) return <div>Error</div>;
                    const news = data.newsfeed.map((feed, idx) => (<li key={idx}>{feed.title}</li>))
                    return (
                        <div>
                            <SearchBar searchKey={searchKey} searchOnChange={this.searchOnChange} />
                            <ul id="news-list">
                                {news}
                            </ul>
                            <button
                                onClick={() => {
                                    fetchMore({
                                        variables: {
                                            page: news.length / 20
                                        },
                                        updateQuery: (prev, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) return prev;
                                            return Object.assign({}, prev, {
                                                newsfeed: [...prev.newsfeed, ...fetchMoreResult.newsfeed]
                                            });
                                        }
                                    })
                                }}
                            >
                                Load More
                            </button>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default graphql(getNewsQuery)(NewsList);
