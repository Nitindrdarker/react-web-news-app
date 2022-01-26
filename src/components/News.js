import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    // articles = [
    //     {
    //         "source": {
    //             "id": "bbc-sport",
    //             "name": "BBC Sport"
    //         },
    //         "author": "BBC Sport",
    //         "title": "How Labuschagne was made in England",
    //         "description": "From Plymouth and Sandwich Town to Ashes winner and the number one batter in the world - Marnus Labuschagne's debt to English club cricket.",
    //         "url": "http://www.bbc.co.uk/sport/cricket/59945356",
    //         "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/108B6/production/_122666776_marnuslabuschagne.jpg",
    //         "publishedAt": "2022-01-12T06:37:27.5345965Z",
    //         "content": "Labuschagne played for Sandwich Town in 2014\r\nThere is a bench somewhere in Kent that has played a part in Australian Marnus Labuschagne's rise to Ashes winner and ranking as the number one Test batt… [+6732 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ]
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} News`;
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }
    async componentDidMount()// run after render function 
    {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae385e5dc9de448c805fce433605ba53&page=0&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({articles:parsedData.articles,
        //      totalResults:parsedData.totalResults,
        //      loading:false
        //     })
        this.updateNews()

    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    };

    // handlePreviousClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae385e5dc9de448c805fce433605ba53&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading:true})
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();

    //     // this.setState({
    //     //     page:this.state.page-1,
    //     //     articles:parsedData.articles,
    //     //     loading: false
    //     // })
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()
    // }
    // handleNextClick = async () => {
    //     // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    //     // {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae385e5dc9de448c805fce433605ba53&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({loading:true})
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();

    //     //     this.setState({
    //     //         page:this.state.page+1,
    //     //         articles:parsedData.articles,
    //     //         loading: false
    //     //     })
    //     // }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()
    // }

    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: '35px 0px' }}>News {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Spinner/>}
                
                <div className="container">
                    <div className="row">

                        {this.state.articles.map((element) => {
                            return element && <div className="col-md-4" key={element.url}>
                                <NewsItem key={element.url} title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
                <div className="container my-3">
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}>
                    </InfiniteScroll>
                </div>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}
            </>
        )
    }
}

export default News
