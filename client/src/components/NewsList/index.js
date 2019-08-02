import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { getNewsQuery } from '../../queries';
import SearchBar from '../SearchBar'
import NewsCell from '../NewsCell';
import './style.css'

class NewsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchKey: "",
            isLoadingMore: false,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.mututeSearchQuery()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    searchOnChange = key => {
        this.setState({ searchKey: key }, () => { this.mututeSearchQuery() })
    }

    mututeSearchQuery = () => {
        this.props.data.refetch({ query: this.state.searchKey })
    }

    handleScroll = e => {
        let dom = e.target
        const scrollTop = (dom.documentElement && dom.documentElement.scrollTop) || dom.body.scrollTop
        const scrollHeight = (dom.documentElement && dom.documentElement.scrollHeight) || dom.body.scrollHeight;
        const clientHeight = dom.documentElement.clientHeight || window.innerHeight;
        if (
            Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
            this.props.data.newsfeed &&
            !this.state.isLoadingMore
        ) {
            this.onLoadMore(this.props.data.newsfeed)
        }
    }

    onLoadMore = news => {
        this.setState({ isLoadingMore: true })
        const { fetchMore } = this.props.data
        fetchMore({
            variables: { page: news.length / 20 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult)
                    return prev;
                this.setState({ isLoadingMore: false })
                return Object.assign({}, prev, {
                    newsfeed: [...prev.newsfeed, ...fetchMoreResult.newsfeed]
                });
            }
        })
    }

    render = () => {

        const { searchKey, isLoadingMore } = this.state

        return (
            <Query
                query={getNewsQuery}
                variables={{ query: searchKey }}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data }) => {

                    if (error) return <div>Error</div>

                    // news cell
                    let news = []
                    if (!loading && data.newsfeed && searchKey.length > 0) {
                        news = data.newsfeed.map((feed, idx) => (
                            <NewsCell key={idx} idx={idx} feed={feed} />
                        ))
                    }

                    // load more indicator
                    let loadingIndicator = null
                    if ((isLoadingMore || loading) && searchKey.length > 0) {
                        loadingIndicator = (<div className="infinit-table-spinner"></div>)
                    }

                    return (
                        <div className="news">
                            <SearchBar searchKey={searchKey} searchOnChange={this.searchOnChange} />
                            <div id="news-list">
                                {news}
                            </div>
                            {loadingIndicator}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default graphql(getNewsQuery)(NewsList);
