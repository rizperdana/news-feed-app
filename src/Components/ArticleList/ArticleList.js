import React, { Component } from 'react';
import Article from '../Article/Article';
import './ArticleList.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const EmptyView = () => {
    <div>
        <img src="https://cataas.com/cat/cute/says/No%20News%20To%20Load" alt="empty view"/>
    </div>
}

const baseUrl = process.env.BASE_API

const categories = [
    'business', 'entertainment', 'environment', 'food', 'health', 'politics',
    'science', 'sports', 'technology'
];

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            articles: [],
            query: ''
        }
    }

    handleNewsSearch(q) {
        this.setState({
            isLoaded: false
        });

        const url = `${baseUrl}/news`
        const payloadBody = {
            countryCode: "us",
            languageCode: "en",
            category: choosenCategory,
            query: queryValue,
            page: 1
        }

        fetch(
            url, {
                method: "POST",
                body: JSON.stringify(payloadBody)
            }
        )
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    articles: result?.results
                });
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }

    componentDidMount() {;
        this.handleNewsSearch('');
    }

    render() {

    }
}

export default ArticleList;
