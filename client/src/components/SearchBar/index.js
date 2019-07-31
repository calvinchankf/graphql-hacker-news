import React, { Component } from 'react';
import './style.css'
class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchKey: props.searchKey
        }
    }

    handleChange = event => {
        this.setState({
            searchKey: event.target.value
        });
    }

    handleSubmit = event => {
        this.props.searchOnChange(this.state.searchKey)
        event.preventDefault();
    }

    render = () => {
        return (
            <form className="search-bar" onSubmit={this.handleSubmit}>
                <label> Hacker News:
                    <input type="text" name="name" value={this.state.searchKey} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Seach" />
            </form>
        )
    }
}

export default SearchBar;
