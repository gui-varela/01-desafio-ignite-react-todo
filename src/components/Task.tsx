import styles from './Task.module.css';
import { Trash, Check } from 'phosphor-react'
import { useState } from 'react';

interface TaskProps {
  id: string;
  title: string;
  onCheck: (idOfTaskToBeChecked: string) => void;
  onDelete: (idOfTaskToBeDeleted: string) => void;
}

export function Task({ id, title, onCheck, onDelete }: TaskProps) {
  const [isTaskDone, setTaskDone] = useState(false)
  
  function handleMarkTaskDone() {
    onCheck(id)
    setTaskDone(!isTaskDone)
  }

  function handleDeleteTask() {
    onDelete(id)
  }

  return (
    <div className={styles.task}> 
      <div 
        onClick={handleMarkTaskDone} 
        className={
          isTaskDone 
          ? 
          `${styles.checkboxChecked} ${styles.checkbox}`
          :
          `${styles.checkboxUnchecked} ${styles.checkbox}`
        }
      >
      
        {isTaskDone && <Check weight="bold" />}

      </div> 
          
      <p
        className={
          isTaskDone 
          ?
          styles.doneTask
          :
          styles.undoneTask
        }
      >
        {title}
      </p>

      <button onClick={handleDeleteTask}><Trash size={20} /></button>
    </div>
  );
}