const fetch = require('node-fetch');

class HackerNewsAPI {

    constructor() {
        this.baseURL = 'https://hn.algolia.com/api/v1/';
    }

    async getNewsfeed(query = 'graphql', page = 0) {
        const raw = await fetch(`${this.baseURL}search?query=${query}&page=${parseInt(page)}`)
        let result = await raw.json()
        // rename fields
        return result.hits.map(item => Object.assign(item, {
            id: item.objectID,
        }))
    }
}

module.exports = HackerNewsAPI;