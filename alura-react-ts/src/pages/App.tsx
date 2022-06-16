import React from 'react';
import Form from '../components/Form';
import List from '../components/List';
import style from './App.module.scss';
import Timer from '../components/Timer';
import { ITasks } from '../types/task';

function App() {
  const [tasks, setTasks] = React.useState<ITasks[]>([]);
  const [selected, setSelected] = React.useState<ITasks>();

  function selectTask(selectedTask: ITasks) {
    setSelected(selectedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        selected: task.id === selectedTask.id ? true : false,
      }))
    );
  }

  function finishTask() {
    if (selected) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === selected.id) {
            return {
              ...task,
              selected: false,
              finished: true,
            };
          }
          return task;
        })
      );
    }
  }

  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks} />
      <List tasks={tasks} selectTask={selectTask} />
      <Timer selected={selected} finishTask={finishTask} />
    </div>
  );
}

export default App;
