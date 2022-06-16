import React from 'react';
import style from './Clock.module.scss';

interface Props {
  time: number | undefined;
}

const Clock = ({ time = 0 }: Props) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minDecimal, minUnit] = String(minutes).padStart(2, '0');
  const [secDecimal, secUnit] = String(seconds).padStart(2, '0');
  return (
    <>
      <span className={style.clockNum}>{minDecimal}</span>
      <span className={style.clockNum}>{minUnit}</span>
      <span className={style.clockDiv}>:</span>
      <span className={style.clockNum}>{secDecimal}</span>
      <span className={style.clockNum}>{secUnit}</span>
    </>
  );
};

export default Clock;
