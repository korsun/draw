import React from 'react';

import './Button.css';

type Props = {
  title: string;
  mod?: 'abort';
  onClick: VoidFunction;
}
export const Button: React.FC<Props> = ({ title, mod, onClick }) => (
  <button onClick={onClick} className={`Button Button--${mod}`}>{title}</button>
);
