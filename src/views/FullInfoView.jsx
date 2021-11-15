import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import s from './Views.module.css';

import * as moviesAPI from '../services/moviesDB-api';
import Status from '../components/Status';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const ActorsInfoView = lazy(() =>
  import('./ActorsInfoView' /* webpacChunkName: ActorsInfo-view*/),
);
const Review = lazy(() =>
  import('./Review' /* webpacChunkName: Review-view-view-view*/),
);

export default function FullInfoView() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    // setStatus(Status.PENDING);
    moviesAPI
      .fetchMoviesFullInfo(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovies({
          src: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          title: original_title,
          score: popularity.toFixed(0),
          overview,
          genres,
        });
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('Что то пошло не так');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <main className={s.main}>
      <button onClick={handleGoBack} type="button" className={s.button}>
        &#9754; Go back
      </button>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJCECTED && <ErrorMessage message={error} />}
      {status === Status.RESOLVED && (
        <>
          <div className={s.filmInfo}>
            <img
              src={movie.src}
              alt={movie.title}
              className={s.fullInfoMovieImg}
            />
            <div className={s.infoWrapper}>
              <h2 className={s.title}>{movie.title}</h2>
              <p className={s.score}>User Score: {movie.score} %</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul className={s.genre}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className={s.nav}>
            <li className={s.linkItems}>
              <NavLink to={`${url}/cast`} className={s.link}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`} className={s.link}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Route path={`${path}/cast`}>
              {status === Status.RESOLVED && <ActorsInfoView />}
            </Route>

            <Route path={`${path}/reviews`}>
              {status === Status.RESOLVED && <Review />}
            </Route>
          </Suspense>
        </>
      )}
    </main>
  );
}
