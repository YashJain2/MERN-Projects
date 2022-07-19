import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import data from '../sampleData.js'
import Spinner from './Spinner';

export class News extends Component {
    capitalize = (str) =>{
        return(str.charAt(0).toUpperCase() + str.slice(1));
    }
    constructor(props) {
        super(props);
        // console.log("hello");
        this.state = {
            articles: [],
            loading: true,
            page: 1
        };
        
        document.title = `${this.capitalize(this.props.category)} - NewsMail`;
    }
    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 10
    }
    static propTypes =
        {
            country: PropTypes.string.isRequired,
            pageSize: PropTypes.number,
            category: PropTypes.string
        }
    // articles = data.articles.filter((e)=>{
    //     return (e.description !== null && e.description.length >80)
    // });

    async updateArticle() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let fetchData = await fetch(url);
        fetchData = await fetchData.json();
        // console.log(fetchData.articles);
        // fetchData = fetchData.articles.filter((e) => {
        //     return (e.description != null && e.description.length > 80);
        // })
        this.setState({ articles: fetchData.articles, totalResult: fetchData.totalResults, loading: false });
        // console.log("Articles fetch properly");
    }

    async componentDidMount() {
        this.updateArticle();
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize))) {
            this.state.page = this.state.page + 1;
            this.updateArticle();
        }
    }
    handlePrevClick = async () => {
        this.state.page = this.state.page - 1;
        this.updateArticle();
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{marginTop:"100px"}}>Latest {this.capitalize(this.props.category)} News</h1>
                {this.state.loading && <Spinner />}
                <div className='row my-3'>
                    {!(this.state.loading) && this.state.articles.map((e) => {
                        return (
                            <div className="col-md-3 my-3" key={e.url}>
                                <NewsItem title={(e.title) ? e.title.slice(0, 40) : "No title to show"} description={(e.description) ? e.description.slice(0, 88) + "...." : "No Description for this news"} imageUrl={e.urlToImage} articleUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
                            </div>
                        )
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn bt-xs btn-dark">&larr; Prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} onClick={this.handleNextClick} className="btn bt-xs btn-dark mx-3">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News



// API KEY: f22d3ef87f3e464fbeb9303126908922