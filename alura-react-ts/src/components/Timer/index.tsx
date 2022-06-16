import React, { useEffect } from 'react';
import Button from '../Button';
import Clock from './Clock';
import style from './Timer.module.scss';
import timeToSeconds from '../../common/utils/time';
import { ITasks } from '../../types/task';

interface Props {
  selected: ITasks | undefined;
  finishTask: () => void;
}

const Timer = ({ selected, finishTask }: Props) => {
  const [time, setTime] = React.useState<number>();

  useEffect(() => {
    if (selected?.time) {
      setTime(timeToSeconds(selected.time));
    }
  }, [selected]);

  function countdown(counter: number = 0) {
    setTimeout(() => {
      if (counter > 0) {
        setTime(counter - 1);
        return countdown(counter - 1);
      }
      finishTask();
    }, 1000);
  }
  return (
    <div className={style.timer}>
      <p className={style.title}>Escolha um card e inicie o cronômetro</p>
      <div className={style.clockWrapper}>
        <Clock time={time} />
      </div>
      <Button onClick={() => countdown(time)}>Iniciar</Button>
    </div>
  );
};

export default Timer;
