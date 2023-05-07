import { ChangeEvent, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { PlusCircle, ClipboardText } from 'phosphor-react'

import styles from './App.module.css'
import { Header } from './components/Header';
import { Task } from './components/Task';
import './global.css'
import { ProgressBar } from './components/ProgressBar';

interface TaskProps {
  id: string;
  title: string;
  isDone: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [title, setTitle] = useState('')
  const [finishedTasks, setFinishedTasks] = useState(0)
  const [progress, setProgress] = useState(0)

  function handleTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleAddTask() {
    setTasks([...tasks, {
      id: uuidv4(),
      title,
      isDone: false
    }])

    console.log(tasks)

    setTitle('')
  }

  function handleCheckTask(idOfTaskToBeChecked: string) {
    const tasksWithoutChangedOne = tasks.map(task => {
      if (task.id === idOfTaskToBeChecked) {
        task.isDone = !task.isDone
      }
      return task
    })

    setTasks(tasksWithoutChangedOne)
    handleFinishedTasks()
  }

  function handleFinishedTasks() {
    const sumFinishedTasks = tasks.reduce(
      (accumulator, task) => accumulator + (task.isDone ? 1 : 0),
      0
    );

    setFinishedTasks(sumFinishedTasks)
  }

  function handleDeleteTask(idOfTaskToBeDeleted: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== idOfTaskToBeDeleted
    });
    
    setTasks(tasksWithoutDeletedOne)
  }

  function handleProgress() {
    if (tasks.length > 0) {
      const progressInPerCent = finishedTasks/tasks.length*100
      const roundedProgress = Math.round(progressInPerCent)
      
      setProgress(roundedProgress)
    }
    else {
      setProgress(0)
    }
  }

  useEffect(() => {
    handleProgress()
  }, [finishedTasks, progress, tasks])

  return (
    <div className={styles.container}>
      <Header></Header>
      
      <main>
        <div className={styles.addTaskContainer}>
          <input onChange={handleTaskTitle} type="text" value={title} placeholder='Adicione uma tarefa' />
          <button 
            disabled={title.length === 0}
            onClick={handleAddTask}
          >
            Criar<PlusCircle size={16} weight="bold" />
          </button>
        </div>

        <div className={styles.taskContainer}>
          <header className={styles.taskContainerHeader}>
            <div className={styles.created}>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>

            <div className={styles.finished}>
              <p>Concluídas</p>
              <span>{finishedTasks}</span>
            </div>
          </header>

          <ProgressBar progress={progress} />

          {
            tasks.length > 0 
          ?
            <div className={styles.taskList}>            
              {tasks.map(task => <Task id={task.id} onCheck={handleCheckTask} onDelete={handleDeleteTask} title={task.title} key={task.id} />)}           
            </div>
          :
            <div className={styles.noTaskContainer}>
              <ClipboardText size={60} weight="light" />
              <h3>Você ainda não tem tarefas cadastradas</h3>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default App