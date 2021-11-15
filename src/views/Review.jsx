import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../services/moviesDB-api';
import Status from '../components/Status';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Review() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    moviesAPI
      .fetchMoviesReview(movieId)
      .then(({ results }) => {
        if (results.length === 0) {
          toast.error('we dont have information about this movie yet');
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('У нас нет информации по данному фильму');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorMessage message={error} />}
      {status === Status.RESOLVED && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h4>Author: {review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
