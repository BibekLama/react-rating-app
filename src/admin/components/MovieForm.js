import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Spinner, Card, Accordion, ListGroup, Dropdown, FormControl, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { castActions, genreActions } from '../../actions';
import {FiXCircle} from 'react-icons/fi';
import NoImage from '../../assets/images/no-img.png';


function MovieForm({ data, loading, handleSubmit, readOnly = false }) {

    const [values, setValues] = useState({
        title: '',
        tagline: '',
        released: 2020,
        poster: null
    });

    const [actor, setActor] = useState(null);

    const [director, setDirector] = useState(null);

    const [producer, setProducer] = useState(null);

    const [writer, setWriter] = useState(null);

    const [actors, setActors] = useState([]);

    const [directors, setDirectors] = useState([]);

    const [producers, setProducers] = useState([]);

    const [writers, setWriters] = useState([]);

    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const casts = useSelector(state => state.casts.casts);

    const genres = useSelector(state => state.genres.genres);

    const [selectedGenres, setSelectedGenres] = useState([]);

    const [genre, setGenre] = useState(null);

    const [file, setFile] = useState(null);

    useEffect(() => {
        if (data) {
            setValues({
                ...values,
                title: data.title,
                tagline: data.tagline,
                released: data.released,
                poster: data.poster
            });
            setActors(data.actors);
            setDirectors(data.directors);
            setProducers(data.producers);
            setWriters(data.writers);
            setSelectedGenres(data.genres);
        }
        dispatch(castActions.fetchCasts());
        dispatch(genreActions.fetchGenres('user'));
    }, [data, setValues])

    function onValueChange(prop, e) { 
        if(e.target.type === 'file'){
            setValues({ ...values, [prop]: e.target.files[0] });
            setFile(URL.createObjectURL(e.target.files[0]));
        }else{
            setValues({ ...values, [prop]: e.target.value });
        }
    }

    function yearItems() {
        let items = [];
        for (let year = 2100; year >= 1900; year--) {
            items.push(year);
        }
        return items;
    }

    function submitForm(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            handleSubmit({
                title: values.title,
                tagline: values.tagline,
                released: values.released,
                poster: values.poster,
                actors,
                directors,
                producers,
                writers,
                genres: selectedGenres
            });
        }
    }

    function addItem(id) {
        if(id === 1 && actor && !actors.filter(item => item.id === actor.id).length > 0) setActors([...actors, actor])
        if(id === 2 && director && !directors.filter(item => item.id === director.id).length > 0) setDirectors([...directors, director])
        if(id === 3 && producer && !producers.filter(item => item.id === producer.id).length > 0) setProducers([...producers, producer])
        if(id === 4 && writer && !writers.filter(item => item.id === writer.id).length > 0) setWriters([...writers, writer])
        if(id === 5 && genre && !selectedGenres.filter(item => item._id === genre._id).length > 0) setSelectedGenres([...selectedGenres, genre])
    }

    function removeItem(id, data) {
        if(id === 1) setActors(actors.filter(item => item.id !== data.id))
        if(id === 2) setDirectors(directors.filter(item => item.id !== data.id))
        if(id === 3) setProducers(producers.filter(item => item.id !== data.id))
        if(id === 4) setWriters(writers.filter(item => item.id !== data.id))
        if(id === 5) setSelectedGenres(selectedGenres.filter(item => item._id !== data._id))
    }

    function handleFileDelete() {
        setFile(null);
        if(data){
            setValues({...setValues, poster: data.poster});
        }
    }


    return (
        <Form noValidate validated={validated} onSubmit={(e) => submitForm(e)}>
            {values.actors}
            <Row>
                <Col md={6} className="pt-4">
                    <Form.Group as={Row} controlId="formHorizontalTitle">
                        <Form.Label column sm={2}>
                            TITLE
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Movie Title"
                                value={values.title}
                                onChange={(e) => onValueChange('title', e)}
                                required
                                readOnly={readOnly} />

                            <Form.Control.Feedback type="invalid">
                                Please enter movie title.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalTagline">
                        <Form.Label column sm={2}>
                            TAGLINE
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Movie Tagline"
                                value={values.tagline}
                                onChange={(e) => onValueChange('tagline', e)}
                                required
                                readOnly={readOnly} />

                            <Form.Control.Feedback type="invalid">
                                Please enter movie tagline.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {readOnly && <Form.Group as={Row} controlId="formHorizontalReleased">
                        <Form.Label column sm={2}>
                            RELEASED
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Movie Title"
                                value={values.released}
                                onChange={(e) => onValueChange('released', e)}
                                required
                                readOnly={readOnly} />

                            <Form.Control.Feedback type="invalid">
                                Please enter movie title.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>}

                    {!readOnly && <Form.Group as={Row} controlId="formHorizontalReleased">
                        <Form.Label column sm={2}>
                            RELEASED
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="select"
                                placeholder="Released"
                                value={values.released}
                                onChange={(e) => onValueChange('released', e)}
                                required
                                readOnly={readOnly}>

                                <option>Choose...</option>
                                {yearItems().map(item => (<option key={item} value={item}>{item}</option>))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please enter movie tagline.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>}

                    {/* Select genres for movie */}
                    <Form.Group as={Row} className="pt-3 mt-4 border-top">
                            <Form.Label column sm={2}>
                                GENRE
                            </Form.Label>
                            {!readOnly && <Col sm={10} className="d-flex align-items-center">
                                <Dropdown className="mr-2" value={genre} onSelect={(v) => { setGenre(JSON.parse(v)) }}>
                                    <Dropdown.Toggle id="dropdown-custom-actor" size="sm" variant="success">
                                        Select Genre {genre && <small className="text-light ml-2">({genre.name})</small>}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as={CustomMenu}>
                                        {genres.length === 0 && <small className="text-muted">Loading...</small>}
                                        {genres.length > 0 && genres.map((gen, i) => <Dropdown.Item
                                            key={i}
                                            eventKey={JSON.stringify(gen)}
                                            active={(genre && genre.name === gen.name) ? true : false}>
                                            {gen.name}
                                        </Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button variant="secondary" size="sm" onClick={() => addItem(5)}>Add Genre</Button>
                            </Col>}

                            {/* Selected genres list */}
                            <Col sm={12} className="mt-3 pt-2 border-top">
                                {selectedGenres.length === 0 && <div>No Genres</div>}
                                {selectedGenres.length > 0 && <ListGroup variant="flush">
                                    {selectedGenres.map((gen, index) => {
                                        return (
                                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                                {index + 1}. {Object.values(gen.name)}
                                                {!readOnly && <FiXCircle size={24} onClick={() => removeItem(5, gen)} className="text-danger pointer"/>}
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>}
                            </Col>
                        </Form.Group>
                        
                    {/* Select actors for movie */}
                    <Form.Group as={Row} className="pt-3 border-top">
                        <Form.Label column sm={2}>
                            ACTOR
                        </Form.Label>
                        {!readOnly && <Col sm={10} className="d-flex align-items-center">
                            <Dropdown className="mr-2" value={actor} onSelect={(v) => { setActor(JSON.parse(v)) }}>
                                <Dropdown.Toggle id="dropdown-custom-actor" size="sm">
                                    Select Actor {actor && <small className="text-light ml-2">({actor.name})</small>}
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {casts.length === 0 && <small className="text-muted">Loading...</small>}
                                    {casts.length > 0 && casts.map((cast, i) => <Dropdown.Item
                                        key={i}
                                        eventKey={JSON.stringify(cast)}
                                        active={(actor && actor.name === cast.name) ? true : false}>
                                        {cast.name}
                                    </Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="secondary" size="sm" onClick={() => addItem(1)}>Add Actor</Button>
                        </Col>}

                        {/* Selected actors list */}
                        <Col sm={12} className="mt-3 pt-2 border-top">
                            {actors.length === 0 && <div>No Actors</div>}
                            {actors.length > 0 && <ListGroup variant="flush">
                                {actors.map((actor, index) => {
                                    return (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                            {index + 1}. {Object.values(actor.name)}
                                            {!readOnly && <FiXCircle size={24} onClick={() => removeItem(1, actor)} className="text-danger pointer"/>}
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>}
                        </Col>
                    </Form.Group>

                    {/* Select directors for movie */}
                    <Form.Group as={Row} className="pt-3 border-top">
                        <Form.Label column sm={2}>
                            DIRECTOR
                        </Form.Label>
                        {!readOnly && <Col sm={10} className="d-flex align-items-center">
                            <Dropdown className="mr-2" value={director} onSelect={(v) => { setDirector(JSON.parse(v)) }}>
                                <Dropdown.Toggle id="dropdown-custom-director" variant="danger" size="sm">
                                    Select Director {director && <small className="text-light ml-2">({director.name})</small>}
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {casts.length === 0 && <small className="text-muted">Loading...</small>}
                                    {casts.length > 0 && casts.map((cast, i) => <Dropdown.Item
                                        key={i}
                                        eventKey={JSON.stringify(cast)}
                                        active={(director && director.name === cast.name) ? true : false}>
                                        {cast.name}
                                    </Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="secondary" size="sm" onClick={() => addItem(2)}>Add Director</Button>
                        </Col>}

                        {/* Selected directors list */}
                        <Col sm={12} className="mt-3 pt-2 border-top">
                            {directors.length === 0 && <div>No Directors</div>}
                            {directors.length > 0 && <ListGroup variant="flush">
                                {directors.map((director, index) => {
                                    return (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                            {index + 1}. {director.name}
                                            {!readOnly && <FiXCircle size={24} onClick={() => removeItem(2, director)} className="text-danger pointer"/>}
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>}
                        </Col>
                    </Form.Group>

                    {/* Select producer for movie */}
                    <Form.Group as={Row} className="pt-3 border-top">
                        <Form.Label column sm={2}>
                            PRODUCER
                        </Form.Label>
                        {!readOnly && <Col sm={10} className="d-flex align-items-center">
                            <Dropdown className="mr-2" value={producer} onSelect={(v) => { setProducer(JSON.parse(v)) }}>
                                <Dropdown.Toggle id="dropdown-custom-producer" variant="warning" size="sm">
                                    Select Producer {producer && <small className="text-light ml-2">({producer.name})</small>}
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {casts.length === 0 && <small className="text-muted">Loading...</small>}
                                    {casts.length > 0 && casts.map((cast, i) => <Dropdown.Item
                                        key={i}
                                        eventKey={JSON.stringify(cast)}
                                        active={(producer && producer.name === cast.name) ? true : false}>
                                        {cast.name}
                                    </Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="secondary" size="sm" onClick={() => addItem(3)}>Add Producer</Button>
                        </Col>}

                        {/* Selected producers list */}
                        <Col sm={12} className="mt-3 pt-2 border-top">
                            {producers.length === 0 && <div>No Producers</div>}
                            {producers.length > 0 && <ListGroup variant="flush">
                                {producers.map((producer, index) => {
                                    return (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                            {index + 1}. {producer.name}
                                            {!readOnly && <FiXCircle size={24} onClick={() => removeItem(3, producer)} className="text-danger pointer"/>}
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>}
                        </Col>
                    </Form.Group>

                    {/* Select writer for movie */}
                    <Form.Group as={Row} className="pt-3 border-top">
                        <Form.Label column sm={2}>
                            WRITER
                        </Form.Label>
                        {!readOnly &&  <Col sm={10} className="d-flex align-items-center">
                            <Dropdown className="mr-2" value={writer} onSelect={(v) => { setWriter(JSON.parse(v)) }}>
                                <Dropdown.Toggle id="dropdown-custom-writer" variant="info" size="sm">
                                    Select Writer {writer && <small className="text-light ml-2">({writer.name})</small>}
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {casts.length === 0 && <small className="text-muted ml-3">Loading...</small>}
                                    {casts.length > 0 && casts.map((cast, i) => <Dropdown.Item
                                        key={i}
                                        eventKey={JSON.stringify(cast)}
                                        active={(writer && writer.name === cast.name) ? true : false}>
                                        {cast.name}
                                    </Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="secondary" size="sm" onClick={() => addItem(4)}>Add Writer</Button>   
                        </Col>}

                        {/* Selected writers list */}
                        <Col sm={12} className="mt-3 pt-2 border-top">
                            {writers.length === 0 && <div>No Writers</div>}
                            {writers.length > 0 && <ListGroup variant="flush">
                                {writers.map((writer, index) => {
                                    return (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                            {index + 1}. {writer.name}
                                            {!readOnly && <FiXCircle size={24} onClick={() => removeItem(4, writer)} className="text-danger pointer"/>}
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>}
                        </Col>
                    </Form.Group>

                    {!readOnly && <Form.Group as={Col} className="mt-3">
                        <Row sm={{ span: 12 }} className="border-top mt-5 pt-3">
                            <Button type="submit" className="d-flex justify-content-center align-items-center">
                                {loading && <Spinner animation="border" size="sm" role="status" className="mr-2">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>}
                                Submit
                            </Button>
                        </Row>
                    </Form.Group>}

                </Col>


                <Col md={6} className="pt-4">

                    {/* Upload Movie Poster */}
                    {!readOnly && <div className="mb-3 pb-3 border-bottom"><Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                POSTER
                            </Form.Label>
                            <Col sm={10}>
                                <Form.File 
                                    id="custom-file"
                                    label="Choose poster..."
                                    custom
                                    onChange={(e) => onValueChange('poster', e)}
                                />
                            </Col>
                        </Form.Group> </div> }
                    
                    {/* Show Movie Poster */}
                    <div>
                        <h5>Movie Poster {file && <Button size="sm" variant="danger" onClick={() => handleFileDelete()}>Remove</Button>}</h5>
                        <Image src={file ? file : values.poster ? values.poster : NoImage} fluid />
                    </div>

                </Col>
            </Row>
        </Form>
    );
}

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
                    )}
                </ul>
            </div>
        );
    },
);

export { MovieForm };