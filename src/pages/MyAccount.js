import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Row, Col, Image, Nav, Tab, Spinner } from 'react-bootstrap';
import { useHistory, NavLink } from 'react-router-dom';
import UserImg from '../assets/images/user.jpg';
import NoImg from '../assets/images/no-img.png';
import { ratingActions } from '../actions';
import {Rating} from '../components';
import moment from 'moment';

function MyAccount() {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const ratings = useSelector(state => state.ratings.ratings);
    const ratingLoading = useSelector(state => state.ratings.loading);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            history.push('/app');
        }
        if (user) {
            dispatch(ratingActions.fetchUserRatings(user.user_id))
        }
    }, [isAuthenticated])
    return (
        <Container className="py-5">
            <Card className="shadow">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col md={3} className="d-flex flex-column justify-content-start align-items-center border-right p-3">
                            <Image src={UserImg} roundedCircle height={100} width={100} className="bg-light border border-dark border-3 mb-3" />
                            <h2>{user && user.profile ? user.profile.name : 'Full Name'}</h2>
                            <h6>{user && user.profile ? user.profile.email : 'Email Address'}</h6>

                            <Nav variant="pills" className="flex-column border-top mt-4 pt-3">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Personal Information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Billing Address</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">My Watchlist</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col md={9}>
                            <Tab.Content className="p-4">
                                <Tab.Pane eventKey="first">
                                    <h1 className="border-bottom pb-3">Personal Information</h1>

                                    {user && <React.Fragment>
                                        <small className="text-muted text-uppercase">Username</small>
                                        <h6 className="text-dark mb-3">{user.username}</h6>
                                    </React.Fragment>}

                                    {user && user.profile && <React.Fragment>
                                        <small className="text-muted text-uppercase">Email</small>
                                        <h6 className="text-dark mb-3">{user.profile.email}</h6>

                                        <small className="text-muted text-uppercase">Fullname</small>
                                        <h6 className="text-dark mb-3">{user.profile.name}</h6>

                                        <small className="text-muted text-uppercase">Gender</small>
                                        <h6 className="text-dark mb-3">{user.profile.gender}</h6>

                                        <small className="text-muted text-uppercase">Birth Year</small>
                                        <h6 className="text-dark mb-3">{user.profile.birth_year}</h6>
                                    </React.Fragment>}

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h1 className="border-bottom pb-3">Billing Address</h1>

                                    {user && user.profile && user.profile.address && user.profile.address.map((address, index) => {
                                        return (<React.Fragment key={index}>
                                            <h6 className="text-danger mb-3">Address {index + 1}</h6>
                                            <small className="text-muted text-uppercase">Street Number</small>
                                            <h6 className="text-dark mb-3">{address.street_number}</h6>

                                            <small className="text-muted text-uppercase">Street Name</small>
                                            <h6 className="text-dark mb-3">{address.street_name}</h6>

                                            <small className="text-muted text-uppercase">Postal Code</small>
                                            <h6 className="text-dark mb-3">{address.postal_code}</h6>

                                            <small className="text-muted text-uppercase">City</small>
                                            <h6 className="text-dark mb-3">{address.city}</h6>

                                            <small className="text-muted text-uppercase">Country</small>
                                            <h6 className="text-dark mb-3">{address.country}</h6>
                                        </React.Fragment>)
                                    }
                                    )}

                                </Tab.Pane>
                                <Tab.Pane eventKey="third" className="watchlist">
                                    <h1 className="border-bottom pb-2 mb-4">My Watchlist</h1>
                                    {ratingLoading && <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>}
                                    {ratings.length > 0 && ratings.map((rating, index) =>{
                                        let date = moment(rating.createdAt).format("YYYYMMDD").toString();
                                        return(
                                            <Row key={index} as={NavLink} to={`/public/movie/${rating ? rating.movieId : ''}`} className="mb-3 border-bottom pb-3 nav">
                                                <Col md={7} className="flex-grow-1 d-flex">
                                                    <Image src={rating.movie && rating.movie.poster ? rating.movie.poster : NoImg}  height={100} width={100} />
                                                    <div className="ml-3 w-75">
                                                        <h5>{rating.movie && rating.movie.title ? rating.movie.title : ''}</h5>
                                                        <p className="text-truncate">{rating.movie && rating.movie.tagline ? rating.movie.tagline : ''}</p>
                                                        <Rating value={rating.movie && rating.movie.rating ? rating.movie.rating : 0} />
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <small>Comment</small>
                                                    <p className="text-truncate">{rating ? rating.summary : ''}</p>
                                                    <small className="text-muted">{moment(date, "YYYYMMDD").fromNow()}</small>
                                                </Col>
                                                <Col md={2}>
                                                    <small>My Rating</small>
                                                    <Rating value={rating  ? rating.rating : 0} />
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Card>
        </Container>
    )
}

export default MyAccount;