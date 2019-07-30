import React, { Component } from 'react';

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
            <form onSubmit={this.handleSubmit}>
                <label> Search:
                    <input type="text" name="name" value={this.state.searchKey} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default SearchBar;
