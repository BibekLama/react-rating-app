import React, { useEffect } from 'react';
import { Carousel, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BG from '../assets/images/banner.jpg';
import { movieActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { MovieItemCard } from '../components';

const styles = {
    background: `url(${BG})`
}

function Home() {

    const dispatch = useDispatch();
    const newReleases = useSelector(state => state.newReleases.movies);
    const releasesLoading = useSelector(state => state.newReleases.loading);

    const popularMovies = useSelector(state => state.popular.movies);
    const popularLoading = useSelector(state => state.popular.loading);

    useEffect(() => {
        dispatch(movieActions.fetchNewReleased(8));
        dispatch(movieActions.fetchPopular(8));
    }, []);

    return (
        <div>
            {/* Carousel */}
            <Carousel style={styles}>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h1>User Rating App</h1>
                        <p>New releases movies</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Carousel.Caption>
                        <h1>User Rating App</h1>
                        <p>Trending movies recommendation.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Carousel.Caption>
                        <h1>User Rating App</h1>
                        <p>#Advanced database, #Advanced Web Technology, #API Management, #Frontend Devlopment</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* High Ratated Movies */}
            <div className="py-5 px-md-5 primary-container" >
                <Container fluid>
                    <Row>
                        <Col xs={12} className="d-flex justify-content-between mb-4">
                            <h3 className="text-warning">Popular</h3>
                            <small><Link to="/public/popular" className="text-light">More...</Link></small>
                        </Col>

                        <MovieItemCard
                            movies={popularMovies}
                            loading={popularLoading} />
                    </Row>
                </Container>
            </div>

            {/* New Released Movies */}
            <div className="py-5 px-md-5 secondary-container">
                <Container fluid>
                    <Row>
                        <Col xs={12} className="d-flex justify-content-between mb-4">
                            <h3 className="text-warning">New Releases</h3>
                            <small><Link to="/public/releases" className="text-light">More...</Link></small>
                        </Col>
                        <MovieItemCard
                            movies={newReleases}
                            loading={releasesLoading} />
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Home