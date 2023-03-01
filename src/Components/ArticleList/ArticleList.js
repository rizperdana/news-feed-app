import React, { Component } from 'react';
import Article from '../../Components/Article/Article';
import './ArticleList.css';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const EmptyView = () => {
    <div>
        <img src="https://cataas.com/cat/cute/says/No%20News%20To%20Load" alt="empty view"/>
    </div>
}

const baseUrl = process.env.REACT_APP_BASE_API

const subCategories = [
    'technology', 'business', 'entertainment', 'environment', 'food',
    'health', 'politics', 'science', 'sports'
];

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: [],
      category: subCategories[0],
      query: 'web'
    };
  }

  handleSubCategoryClick(category) {
    this.setState({ category: category })
  }

  handleQueryChange(e) {
    this.setState({ query: e.target.value });
    this.getArticleFromApi();
  }

  handleQuerySearch() {
    this.getArticleFromApi();
  }

  componentDidMount() {;
    this.getArticleFromApi();
  }

  getArticleFromApi() {
    this.setState({
        isLoaded: false
    });

    const url = `${baseUrl}/news`
    const payloadBody = {
        countryCode: "us",
        languageCode: "en",
        category: this.state.category,
        query: this.state.query,
        page: 1
    }

    fetch(
        url, {
            method: "POST",
            body: JSON.stringify(payloadBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(response => response.json())
    .then(
        (result) => {
            this.setState({
                isLoaded: true,
                articles: result.results
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

  render() {
    const {error, isLoaded, articles} = this.state;

    if (error) {
      return <div>Error in Loading</div>
    } else if (!isLoaded) {
      return <LoadingSpinner />
    } else {
      return(
        <div>
          <div className="search-wrap">
            <div className="search-bar">
              <input type="text"
               className="search-input"
               value={this.state.query}
               onChange={this.handleQueryChange.bind(this)}
              />
            <button type="submit"
                    className="search-button"
                    onClick={() => this.handleQuerySearch()}
                    disabled={!this.state.query}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="subcategory-list-div">
            {subCategories.map((subCategory, index) =>
              <div key={index} className="individual-subcategory"
                   onClick={() => this.handleSubCategoryClick(subCategory)}>
                <button className="subcategory-pill">{subCategory}</button>
              </div>
            )}
          </div>
          {
            articles.length === 1 ?
            <h4>{articles.length} RESULT FOUND</h4> :
            <h4>{articles.length} RESULTS FOUND</h4>
          }
          {
            articles.length ? <div className="article-list-div">
              {articles.map((article, i) => (
                article.creator ?
                <Article article={article} key={i}/> : null
              ))}
            </div> : <EmptyView />
          }
        </div>
      )
    }
  }
}

export default ArticleList;
