import React from 'react';
import { ITasks } from '../../../types/task';
import style from './Item.module.scss';

interface Props extends ITasks {
  selectTask: (selectedTask: ITasks) => void;
}

const item = ({ task, time, selected, completed, id, selectTask }: Props) => {
  return (
    <li
      className={`${style.item} ${selected ? style.selectedItem : ''} ${
        completed ? style.completedItem : ''
      }`}
      onClick={() =>
        !completed &&
        selectTask({
          task,
          time,
          selected,
          completed,
          id,
        })
      }>
      <h3>{task}</h3>
      <span>{time}</span>
      {completed && (
        <span className={style.completed} aria-label='task completed'></span>
      )}
    </li>
  );
};

export default item;
