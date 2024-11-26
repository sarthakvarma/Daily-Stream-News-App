import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState('');

    const apiOptions = {
        api1: props.apiKey, // News API Key
        api2: 'CvV_ZG0okF0sbtScxRT-sdIxx0G-dNyWwoobaOnjWC5cj200' // Currents API Key
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async (selectedApiKey = apiOptions.api1) => {
        try {
            props.setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${selectedApiKey}&page=${page}&pageSize=${props.pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            props.setProgress(30);
            let parsedData = await data.json();
            props.setProgress(70);

            // Check if articles are empty, if so, try Currents API
            if (!data.ok || parsedData.articles.length === 0) {
                const currentsUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiOptions.api2}&country=${props.country}&category=${props.category}`;
                let currentsData = await fetch(currentsUrl);
                let currentsParsedData = await currentsData.json();

                if (currentsParsedData.status === 'ok' && currentsParsedData.news.length > 0) {
                    const currentsArticles = currentsParsedData.news.map((article) => ({
                        title: article.title,
                        description: article.description,
                        urlToImage: article.image, // Image URL
                        url: article.url,
                        author: article.author || 'Unknown', // Author name
                        publishedAt: article.published || '', // Published date
                        source: { name: article.source || article.author || 'Unknown' } // Use author if source is not available
                    }));
                    setArticles(currentsArticles);
                    setTotalResults(currentsParsedData.news.length);
                    setError(''); // Clear previous error
                } else {
                    setError(`Sorry, no news available for this country from both APIs.`);
                }
            } else {
                const newsArticles = parsedData.articles.map((article) => ({
                    title: article.title,
                    description: article.description,
                    urlToImage: article.urlToImage,
                    url: article.url,
                    author: article.author || 'Unknown',
                    publishedAt: article.publishedAt || '',
                    source: { name: article.source.name || 'Unknown' }
                }));
                setArticles(newsArticles);
                setTotalResults(parsedData.totalResults);
                setError(''); // Clear previous error
            }

            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
            setError('An error occurred while fetching news articles: ' + error.message);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - Daily Stream`;
        updateNews();
        // eslint-disable-next-line
    }, [page]); // Updated to trigger on page change

    const fetchMoreData = async () => {
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiOptions.api1}&page=${page + 1}&pageSize=${props.pageSize}`;
            setPage(page + 1);
            let data = await fetch(url);
            let parsedData = await data.json();

            // If no more articles from News API, fallback to Currents API
            if (!data.ok || parsedData.articles.length === 0) {
                const currentsUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiOptions.api2}&country=${props.country}&category=${props.category}`;
                let currentsData = await fetch(currentsUrl);
                let currentsParsedData = await currentsData.json();

                if (currentsParsedData.status === 'ok' && currentsParsedData.news.length > 0) {
                    const currentsArticles = currentsParsedData.news.map((article) => ({
                        title: article.title,
                        description: article.description,
                        urlToImage: article.image, // Image URL
                        url: article.url,
                        author: article.author || 'Unknown', // Author name
                        publishedAt: article.published || '', // Published date
                        source: { name: article.source || article.author || 'Unknown' } // Use author if source is not available
                    }));
                    setArticles(articles.concat(currentsArticles));
                }
            } else {
                const newsArticles = parsedData.articles.map((article) => ({
                    title: article.title,
                    description: article.description,
                    urlToImage: article.urlToImage,
                    url: article.url,
                    author: article.author || 'Unknown',
                    publishedAt: article.publishedAt || '',
                    source: { name: article.source.name || 'Unknown' }
                }));
                setArticles(articles.concat(newsArticles));
            }

            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching more news:', error);
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                Daily Stream - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner />}
            {error ? (
                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>{error}</p>
            ) : (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={element.title ? element.title : ''}
                                            description={element.description ? element.description : ''}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name} // Already updated to check in previous part
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;
