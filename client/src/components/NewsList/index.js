import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getNewsQuery } from '../../queries';
import SearchBar from '../SearchBar'
class NewsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchKey: "calvin"
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
        const data = this.props.data
        if (data.loading) {
            return (<div>Loading...</div>)
        }
        const news = data.newsfeed.map(feed => (<li key={feed.id}>{feed.title}</li>))
        return (
            <div>
                <SearchBar searchKey={this.state.searchKey} searchOnChange={this.searchOnChange} />
                <ul id="news-list">
                    {news}
                </ul>
            </div>
        )
    }
}

export default graphql(getNewsQuery)(NewsList);
