import s from './Views.module.css';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory} from 'react-router-dom';
import * as moviesAPI from '../services/moviesDB-api';
import SearchBar from '../components/SearchBar';
import Status from '../components/Status';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';


export default function MoviesView() {
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movie, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const history = useHistory();

  useEffect(() => {
    if (!query) return;
    setStatus(Status.PENDING);

    moviesAPI
      .fetchMoviesByKeyWord(query)
      .then(({ results }) => {
        if (results.length === 0) {
          setError(`Ничего не найдено по запросу ${query}`);
          setStatus(Status.REJECTED);
          return;
        }

        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Что то пошло не так =(');
        setStatus(Status.REJECTED);
      });
  }, [query]);

  useEffect(() => {
    const query = history.location.search.split("=")[1]
    if (query) {
      moviesAPI
        .fetchMoviesByKeyWord(query)
        .then(({ results }) => {
          if (results.length === 0) {
            setError(`Ничего не найдено по запросу ${query}`);
            setStatus(Status.REJECTED);
            return;
          }

          setMovies(results);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          console.log(error);
          setError('Что то пошло не так =(');
          setStatus(Status.REJECTED);
        });
    }
  }, []);
  

  const searchMovies = newSearch => {
    setQuery(newSearch);
    setMovies(null);
    setError(null);
    setStatus(Status.IDLE);
    console.log('history :>> ', history);
    history.push(`${url}?query=${newSearch}`)
  };

  return (
    <main>
      <SearchBar onHandleSubmit={searchMovies} />
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorMessage message={error} />}

      {status === Status.RESOLVED && (
        <>
          <h2 className={s.header}>Movies</h2>
          <ul className={s.moviesList}>
            {movie.map(movies => (
              <li key={movies.id} className={s.moviesItem}>
                {/* <Link to={`${url}/${movies.id}`}> */}
                  <Link to={{pathname:`${url}/${movies.id}`, state:{from: history.location.pathname + history.location.search}}} >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                    alt={movies.title}
                    className={s.fullInfoMovieImg}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
