import React, { Component } from 'react';
import Button from '../Button';
import style from './Form.module.scss';
import { ITasks } from '../../types/task';
import { v4 as uuidv4 } from 'uuid';

export class Form extends Component<{
  setTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
}> {
  state = {
    task: '',
    time: '00:00',
  };

  addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.setTasks((prevTasks) => [
      ...prevTasks,
      { ...this.state, selected: false, completed: false, id: uuidv4() },
    ]);
    this.setState({ task: '', time: '00:00' });
  }

  render() {
    return (
      <form className={style.newTask} onSubmit={this.addTask.bind(this)}>
        <div className={style.inputContainer}>
          <label htmlFor="task">Adicione um novo estudo</label>
          <input
            type="text"
            name="task"
            id="task"
            value={this.state.task}
            onChange={(e) =>
              this.setState({ ...this.state, task: e.target.value })
            }
            placeholder="O que você quer estudar?"
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="time"></label>
          <input
            type="time"
            step="1"
            name="time"
            value={this.state.time}
            onChange={(e) =>
              this.setState({ ...this.state, time: e.target.value })
            }
            id="time"
            min="00:00:00"
            max="01:30:00"
            required
          />
        </div>
        <Button type="submit">Adicionar</Button>
      </form>
    );
  }
}

export default Form;
