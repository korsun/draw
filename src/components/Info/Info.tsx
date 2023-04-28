import React from 'react';

import { Button } from '../Button/Button';

import './Info.css';

type Props = {
	p1: number[];
	p2: number[];
	p3: number[];
	area: number;
  onResetClick: () => void;
  onAboutClick: () => void;
}

export const Info: React.FC<Props> = ({ p1, p2, p3, area, onResetClick, onAboutClick }) => (
  <div className='Info' onClick={
    (event) => {
      event.stopPropagation();
      event.preventDefault();
    }
  }>
    <p className='Info__directions'>
      <strong>Choose 3 arbitrary points</strong>
    </p>

    <p>P1: {p1.join(', ')}</p>
    <p>P2: {p2.join(', ')}</p>
    <p>P3: {p3.join(', ')}</p>
    <p>Area: {area} px<sup>2</sup></p>

    <div className='Info__button'>
      <Button title='Reset' onClick={onResetClick} mod='abort' />
    </div>
    <div className='Info__button'>
      <Button title='About' onClick={onAboutClick} />
    </div>
  </div>
);
