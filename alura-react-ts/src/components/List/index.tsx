import React from 'react';
import style from './List.module.scss';
import Item from './Item/index';
import { ITasks } from '../../types/task';

interface Props {
  tasks: ITasks[];
  selectTask: (selectedTask: ITasks) => void;
}

const List = ({ tasks, selectTask }: Props) => {
  return (
    <aside className={style.taskList}>
      <h2>Lista de estudos</h2>
      <ul>
        {tasks.map((item, index) => (
          <Item selectTask={selectTask} key={item.id} {...item} />
        ))}
      </ul>
    </aside>
  );
};

export default List;
