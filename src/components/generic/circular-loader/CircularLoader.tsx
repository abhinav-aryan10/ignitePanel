/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default */
// import React from 'react';
import './CircularLoader.scss';

interface IProps {
  loaderSize: string;
}

function CircularLoader({ loaderSize }: IProps) {
  return (
    <div
      className={`loader_spin ${
        loaderSize === 'large' ? 'loader_spin_large' : ''
      }`}
    />
  );
}

export default CircularLoader;
