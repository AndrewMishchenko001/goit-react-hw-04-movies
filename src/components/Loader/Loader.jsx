import React from 'react';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

function LoaderSpinner() {
  return (
    <div className={s.wrapper}>
      <Loader
        className="Loader App-logo"
        type="ThreeDots"
        color="#11BFFF"
        height={300}
        width={300}
        timeout={3000}
      />
    </div>
  );
}

export default LoaderSpinner;
