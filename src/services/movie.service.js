import axios from 'axios';
import {authHeader, tokenHeader, queryString} from '../helpers';

export const movieService = {
    getAll,
    addMovie,
    deleteMovieById,
    getById,
    updateMovie,
    getByRating,
    getByReleased,
    searchMoviesByTitle,
    getByGenre
};

function getAll(){

    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data)
        .then( movies => {
            movies = movies.map( movie => {  
                    return axios({
                        method:'get', 
                        url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/id/${movie.id}/?${query}`, 
                        headers: authHeader()
                    }).then(res => res.data.data)
                   .then( m =>  { return {...movie, movieId: m._id, poster: m.imgUrl, genres: m.genres} })
                   .catch(err =>  { return {...movie, movieId: null, poster: null, genres: null} })
                });
           
            Promise.all(movies).then( 
                value => {
                    // console.log(value);
                    resolve(value)
                },
                err => {
                    console.log(err.response)
                })
            
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function getById(id, role){

    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}?${query}`, 
            headers: role === 'user' ? authHeader() : tokenHeader()
        })
        .then(response => response.data)
        .then(async movie => {
            if(movie){
                movie =  await axios({
                    method:'get', 
                    url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/id/${movie.id}/?${query}`, 
                    headers: role === 'user' ? authHeader() : tokenHeader(),
                })
                .then(res => res.data.data)
                .then(mov => { return {...movie, mongoId: mov._id, poster: mov.imgUrl, genres: mov.genres, rating:(mov.ratingValue/mov.ratingCount)}} )
                .catch(err => { return {...movie, mongoId: null, poster: null, genres: [], rating:0}})
            }
            console.log(movie)
            resolve(movie)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function addMovie(data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    const movieData = JSON.stringify({
        title: data.title,
        tagline: data.tagline,
        released: data.released,
    });

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: movieData
        })
        .then(response => response.data)
        .then( async movie => {
            if(data.actors.length > 0) await addActors(data.actors, movie.id);
            if(data.directors.length > 0) await addDirectors(data.directors, movie.id);
            if(data.producers.length > 0) await addProducers(data.producers, movie.id);
            if(data.writers.length > 0) await addWriters(data.writers, movie.id);

            await addMongoMovie(movie.id, data.poster, data.genres);
            
            resolve(movie)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function deleteMovieById(id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'}
        })
        .then(response => response.data)
        .then(async movie => {
            await deleteMongoMovie(movie.id)
            resolve(movie);
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function updateMovie(id, data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    const body = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        return axios({
            method:'patch', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: body
        })
        .then(response => response.data)
        .then(async movie => {
            let mov = await updateMongoMovie(id, data.poster, data.genres);
            if(mov){
                movie = {...movie, imgUrl: mov.imgUrl, genres: mov.genres};
            }

            if(movie.actors.length > 0){
                await removeActors(movie.actors, movie.id);
            }

            if(movie.directors.length > 0){
                await removeDirectors(movie.directors, movie.id);
            }

            if(movie.producers.length > 0){
                await removeProducers(movie.producers, movie.id);
            }

            if(movie.writers.length > 0){
                await removeWriters(movie.writers, movie.id);
            }

            if(data.actors.length > 0){
                let actors = await addActors(data.actors, movie.id);
                movie = {...movie, actors}
            }

            if(data.directors.length > 0){
                let directors  = await addDirectors(data.directors, movie.id);
                movie = {...movie, directors}
            }

            if(data.producers.length > 0){
                let producers = await addProducers(data.producers, movie.id);
                movie = {...movie, producers}
            }

            if(data.writers.length > 0){
                let writers  = await addWriters(data.writers, movie.id);
                movie = {...movie, writers}
            }

            resolve(movie);
        })
        .catch(error => {
            console.log(error.response)
            debugger
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function getByRating(limit=0){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/ratings/${limit}/?${query}`, 
            headers: tokenHeader()
        })
        .then(response => response.data.data)
        .then(movies => {
            movies = movies.map( movie => {     
                return axios({
                    method:'get', 
                    url:`${process.env.REACT_APP_API_URL}/movies/1.1/${movie.movieId}/?${query}`, 
                    headers: tokenHeader()
                }).then(res => res.data)
               .then( m =>  { return {...movie, poster: movie.imgUrl, id: m.id, title: m.title, tagline: m.tagline, released: m.released, rating: (movie.ratingValue/movie.ratingCount)} })
               .catch(err =>  { return {...movie, poster:null,  id: null, title: null, tagline: null, released: null, rating:0} })
            });
       
        Promise.all(movies).then( 
            value => {
                // console.log(value);
                resolve(value)
            },
            err => {
                console.log(err.response)
            })
        })
        .catch(error => {
            console.log(error.response)
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}

function getByGenre(genre,limit=0){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/genres/1.0/movies/${genre}/?${query}`, 
            headers: tokenHeader()
        })
        .then(response => response.data.data.movies)
        .then(movies => {
            movies = movies.map( movie => {     
                return axios({
                    method:'get', 
                    url:`${process.env.REACT_APP_API_URL}/movies/1.1/${movie.movieId}/?${query}`, 
                    headers: tokenHeader()
                }).then(res => res.data)
               .then( m =>  { return {...movie, poster: movie.imgUrl, id: m.id, title: m.title, tagline: m.tagline, released: m.released, rating: (movie.ratingValue/movie.ratingCount)} })
               .catch(err =>  { return {...movie, poster:null,  id: null, title: null, tagline: null, released: null, rating:0} })
            });
       
        Promise.all(movies).then( 
            value => {
                // console.log(value);
                resolve(value)
            },
            err => {
                console.log(err.response)
            })
        })
        .catch(error => {
            console.log(error.response)
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}

function getByReleased(limit=10){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/?page=1&limit=${limit}&orderBy=released&${query}`, 
            headers: tokenHeader()
        })
        .then(response => response.data)
        .then( async movies => {
            movies = movies.map( movie => {
                    
                    return axios({
                        method:'get', 
                        url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/id/${movie.id}/?${query}`, 
                        headers: tokenHeader()
                    }).then(res => res.data.data)
                   .then( m =>  { return {...movie, movieId: m._id, poster: m.imgUrl, genres: m.genres, rating: (movie.ratingValue/movie.ratingCount)} })
                   .catch(err =>  { return {...movie, movieId: null, poster: null, genres: null, rating: 0} })
                });
           
            Promise.all(movies).then( 
                value => {
                    // console.log(value);
                    resolve(value)
                },
                err => {
                    console.log(err.response)
                })
            
        })
        .catch(error => {
            // console.log(error.response)
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function searchMoviesByTitle(searchText){

    var queries = {
        title: searchText,
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/search?${query}`, 
            headers: tokenHeader()
        })
        .then(response => response.data)
        .then( movies => {
            movies = movies.map( movie => {
                    
                    return axios({
                        method:'get', 
                        url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/id/${movie.id}/?${query}`, 
                        headers: tokenHeader()
                    }).then(res => res.data.data)
                   .then( m =>  { return {...movie, movieId: m._id, poster: m.imgUrl, genres: m.genres} })
                   .catch(err =>  { return {...movie, movieId: null, poster: null, genres: null} })
                });
           
            Promise.all(movies).then( 
                value => {
                    // console.log(value);
                    resolve(value)
                },
                err => {
                    console.log(err.response)
                })
            
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function addActors(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/actors/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( actors => resolve(actors))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function addDirectors(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/directors/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( directors => resolve(directors))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function addProducers(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/producers/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( producers => resolve(producers))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function addWriters(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/writers/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( writers => resolve(writers))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function removeActors(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/actors/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( actors => resolve(actors))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function removeDirectors(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/directors/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( directors => resolve(directors))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function removeProducers(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/producers/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( producers => resolve(producers))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

function removeWriters(data, id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/movies/1.1/${id}/writers/?${query}`, 
            headers: {...authHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then( writers => resolve(writers))
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}


function addMongoMovie(movieId, poster, genres){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    let formData = new FormData();
    formData.append('movieId', movieId);
    formData.append('img', poster);
    genres.map(item => formData.append('genres', item._id));

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/?${query}`, 
            headers: {...authHeader(), 'content-type': 'multipart/form-data'},
            data: formData
        })
        .then(response => response.data.data)
        .then( movie => resolve(movie))
        .catch(error => {
            // console.log(error.response)
            // debugger
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error.message : error.message
            })
        });
    });
}

function updateMongoMovie(movieId, poster, genres){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    let formData = new FormData();
    formData.append('img', poster);
    genres.map(item => formData.append('genres', item._id));

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/id/${movieId}/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data.data)
        .then( data => {
            axios({
                method:'patch', 
                url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/${data.movieId}/?${query}`, 
                headers: {...authHeader(), 'content-type': 'multipart/form-data'},
                data: formData
            })
            .then(response => response.data.movie)
            .then(movie => {
                resolve(movie)
            })
            .catch(error => {
                reject({
                    status: error.response ? error.response.status : 500,
                    message: error.response ? error.response.data.message : error.message
                });
            })
        })
        .catch(error => {
            if(error.response.status === 404){
                addMongoMovie(movieId, poster, genres)
                .then(
                    movie => {
                        // debugger
                        resolve(movie);
                    },
                    err => {
                        reject(err);
                    }
                )
            }else{
                reject({
                    status: error.response ? error.response.status : 500,
                    message: error.response ? error.response.data.message : error.message
                });
            }
        });
    });
}

function deleteMongoMovie(movieId){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/mongo-movies/1.2/${movieId}/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data.data)
        .then( data => {
           resolve(data)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            });
        });
    });
}
