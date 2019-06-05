import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getNewsQuery } from '../../queries';

class NewsList extends Component {
    render = () => {
        const data = this.props.data
        if (data.loading) {
            return (<div>Loading...</div>)
        }
        const news = data.newsfeed.map(feed => (<li key={feed.id}>{feed.title}</li>))
        return (
            <div>
                <ul id="news-list">
                    {news}
                </ul>
            </div>
        )
    }
}

export default graphql(getNewsQuery)(NewsList);
