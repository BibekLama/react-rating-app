import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieActions, ratingActions, alertActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Image, Spinner, Row, Media, Button, Modal, Form, Alert } from 'react-bootstrap';
import VideoImg from '../assets/images/video.jpg';
import UserImg from '../assets/images/user.jpg';
import { MovieItemMedia, Rating } from '../components';
import moment from 'moment';
import { FaHeart } from 'react-icons/fa';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

function MovieDetail() {

    let { id } = useParams();

    const dispatch = useDispatch();
    const movie = useSelector(state => state.movie.movie);
    const loading = useSelector(state => state.movie.loading);
    const popularMovies = useSelector(state => state.popular.movies);
    const popularLoading = useSelector(state => state.popular.loading);
    const ratings = useSelector(state => state.ratings.ratings);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loggedUser = useSelector(state => state.auth.user);
    const [validated, setValidated] = useState(false);
    const [comment, setComment] = useState('');
    const ratingLoader = useSelector(state => state.rating.loading)
    const alert = useSelector(state => state.alert);

    function handleComment(e){
        setComment(e.target.value);
    }

    useEffect(() => {
        dispatch(movieActions.fetchMovie(id));
        dispatch(movieActions.fetchPopular(6));
        dispatch(ratingActions.fetchMovieRatings(id));
        dispatch(alertActions.clear())
    }, [id, isAuthenticated]);

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
        setRatingValue(0);
        setComment('');
        setValidated(false);
        dispatch(alertActions.clear());
    }
    const handleModalShow = () => setShowModal(true);
    const [ratingValue, setRatingValue] = useState(0);

    function onHandleRating(num, e) {
        e.preventDefault();
        setRatingValue(num);
        if (ratingValue === num) {
            setRatingValue(0);
        }
    }

    function submitForm(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            if(ratingValue === 0){
                dispatch(alertActions.error("Please add rating."));
            }else{
                dispatch(ratingActions.addRating({
                    movieId: parseInt(id),
                    userId: loggedUser.user_id,
                    rating: ratingValue,
                    summary: comment
                }))
                dispatch(movieActions.fetchMovie(id));
                dispatch(ratingActions.fetchMovieRatings(id));
            }
        }
    }

    return (
        <div className="py-4 px-md-5 secondary-container text-light">
            <Container fluid>
                <Row>
                    <Col md={8}>
                        <div className="video-box">
                            <Image fluid src={VideoImg} />
                            <Spinner animation="border" role="status" variant="light" className="mr-2 text-light loader">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                        <div className="py-3 d-flex justify-content-between border-bottom border-dark">
                            <div>
                                <h1>{movie ? movie.title : 'Movie Title'}</h1>
                                {movie && movie.genres && movie.genres.length > 0 && <small className="text-light">
                                    Genre : {movie.genres.map((genre, index) => {
                                        if(index < movie.genres.length - 1){
                                            return genre.name+", "
                                        }else{
                                            return genre.name
                                        }
                                    })}
                                </small>}
                            </div>
                            <div className="d-flex">
                                <Button className="mr-3 px-3" variant="secondary" onClick={handleModalShow}>
                                    <FaHeart className="text-light" fontSize={30} />
                                </Button>
                                <div className="text-right">
                                    <Rating value={movie ? movie.rating : 0} />
                                    <h6 className="mt-2">Released: {movie ? movie.released : '1900'}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="py-3 border-bottom border-dark">
                            <h6>Summary:</h6>
                            <p>{movie ? movie.tagline : 'Movie Tagline'}</p>
                            <h6>Actors:</h6>
                            <p>{movie ? movie.actors.map(actor => actor.name + ", ") : 'No Actors'}</p>
                            <h6>Directors:</h6>
                            <p>{movie ? movie.directors.map(director => director.name + ", ") : 'No Directors'}</p>
                            <h6>Producers:</h6>
                            <p>{movie ? movie.producers.map(producer => producer.name + ", ") : 'No Producers'}</p>
                            <h6>Writers:</h6>
                            <p>{movie ? movie.writers.map(writer => writer.name + ", ") : 'No Writers'}</p>
                        </div>
                        {ratings.length > 0 && ratings.map((rating, index) => {
                            let date = moment(rating.createdAt).format("YYYYMMDD").toString();
                            return (
                                <Media key={index} className="border-bottom mb-3 align-items-center border-dark">
                                    <img
                                        width={64}
                                        height={64}
                                        className="mr-3"
                                        src={UserImg}
                                        alt="Generic placeholder"
                                    />
                                    <Media.Body className="align-items-center d-flex justify-content-between">
                                        <div className="py-3">
                                            <h5>{rating.username}</h5>
                                            <p>{rating.summary}</p>
                                            <small className="text-muted">{moment(date, "YYYYMMDD").fromNow()}</small>
                                        </div>
                                        <Rating value={rating.rating} />
                                    </Media.Body>
                                </Media>
                            )
                        })}
                    </Col>
                    <Col md={4}>
                        <MovieItemMedia
                            movies={popularMovies}
                            loading={popularLoading}
                        />
                    </Col>
                </Row>
            </Container>

            <Modal
                show={showModal}
                onHide={handleModalClose}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Movie Rating</Modal.Title>
                </Modal.Header>

                {alert && alert.type && alert.message && <Alert variant={alert.type}>
                    {alert.message}
                </Alert>}

                {!isAuthenticated && <React.Fragment>
                    <Modal.Body>
                        <p>Please login to rate this movie.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </React.Fragment>}
                {isAuthenticated && <React.Fragment>
                    <Form noValidate validated={validated} onSubmit={(e) => submitForm(e)}>
                        <Modal.Body>
                            <Form.Group className="rating-btn">
                                <Form.Label className="mr-3">Rating</Form.Label>
                                <Button onClick={(e) => onHandleRating(1, e)} variant="link">
                                    {ratingValue >= 1 && <IoMdStar fontSize={24} />}
                                    {ratingValue < 1 && <IoMdStarOutline fontSize={24} />}
                                </Button>
                                <Button onClick={(e) => onHandleRating(2, e)} variant="link">
                                    {ratingValue >= 2 && <IoMdStar fontSize={24} />}
                                    {ratingValue < 2 && <IoMdStarOutline fontSize={24} />}
                                </Button>
                                <Button onClick={(e) => onHandleRating(3, e)} variant="link">
                                    {ratingValue >= 3 && <IoMdStar fontSize={24} />}
                                    {ratingValue < 3 && <IoMdStarOutline fontSize={24} />}
                                </Button>
                                <Button onClick={(e) => onHandleRating(4, e)} variant="link">
                                    {ratingValue >= 4 && <IoMdStar fontSize={24} />}
                                    {ratingValue < 4 && <IoMdStarOutline fontSize={24} />}
                                </Button>
                                <Button onClick={(e) => onHandleRating(5, e)} variant="link">
                                    {ratingValue >= 5 && <IoMdStar fontSize={24} />}
                                    {ratingValue < 5 && <IoMdStarOutline fontSize={24} />}
                                </Button>
                            </Form.Group>
                            <Form.Group controlId="formComment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as="textarea" rows="3" value={comment} onChange={(e) => handleComment(e)} required />
                                <Form.Control.Feedback type="invalid">
                                    Please enter comment.
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">
                                {ratingLoader && <Spinner animation="border" size="sm" role="status" className="mr-2">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>}
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
            </React.Fragment>}
                
            </Modal>
        </div>
    )
}

export default MovieDetail;