import { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import s from './Views.module.css';
import * as moviesAPI from '../services/moviesDB-api';
import Status from '../components/Status';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const history = useHistory();

  useEffect(() => {
    setStatus(Status.PENDING);
    moviesAPI
      .fetchPopMovies()
      .then(({ results }) => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('Что то пошло не так');
        setStatus(Status.REJECTED);
      });
  }, []);

  return (
    <main>
      <h1 className={s.header}>Trending today</h1>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorMessage message={error} />}
      {status === Status.RESOLVED && (
        <ul className={s.moviesList}>
          {movies.map(movies => (
            <li key={movies.id} className={s.moviesItem}>
              {/* <Link to={`movies/${movies.id}`}> */}
                <Link to={{pathname: `movies/${movies.id}`,state:{from: history.location.pathname + history.location.search}}} >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                  alt={movies.title}
                  className={s.fullInfoMovieImg}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
