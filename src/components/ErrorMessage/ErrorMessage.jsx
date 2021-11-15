import PropTypes from 'prop-types';
import s from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <div className={s.wrapper}>
      <p text={message} className={s.text}>
        {message}
      </p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
