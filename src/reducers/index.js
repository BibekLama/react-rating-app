import { combineReducers} from 'redux';
import auth from './auth.reducer';
import movies from './movies.reducer';
import alert from './alert.reducer';
import movieForm from './movie.form.reducers';
import deleteMovie from './deleteMovie.reducer';
import movie from './movie.reducer';
import genres from './genres.reducer';
import genreForm from './genre.form.reducer';
import genre from './genre.reducer';
import deleteGenre from './deleteGenre.reducer';
import casts from './casts.reducer';
import cast from './cast.reducer';
import castForm from './cast.form.reducer';
import deleteCast from './deleteCast.reducer';
import newReleases from './new.releases.reducer';
import popular from './popular.reducer';
import ratings from './ratings.reducer';
import rating from './rating.reducer';
import user from './user.reducer';
import chart from './chart.reducer';

const rootReducer = combineReducers({
    alert,
    auth,
    movies,
    movieForm,
    deleteMovie,
    movie,
    genres,
    genreForm,
    genre,
    deleteGenre,
    casts,
    cast,
    castForm,
    deleteCast,
    newReleases,
    popular,
    ratings,
    rating,
    user,
    chart
});

export default rootReducer;