import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from './Views.module.css';
import * as moviesAPI from '../services/moviesDB-api';
import Status from '../components/Status';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import noImage from '../images/noImage.png';

export default function ActorsInfo() {
  const { movieId } = useParams();
  const [authors, setAuthors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    // setStatus(Status.PENDING);
    moviesAPI
      .fetchMoviesActorsInfo(movieId)
      .then(({ cast }) => {
        setAuthors(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Что то пошло не так');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorMessage message={error} />}
      {status === Status.RESOLVED && (
        <ul className={s.actorsInfoList}>
          {authors.map(authors => (
            <li key={authors.id} className={s.actorsInfoItem}>
              <img
                src={
                  authors.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${authors.profile_path}`
                    : noImage
                }
                alt={authors.original_name}
                className={s.actorsInfoImg}
              />
              <h3>{authors.original_name}</h3>
              <p>{authors.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
