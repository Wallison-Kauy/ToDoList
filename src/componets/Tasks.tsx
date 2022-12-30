import styles from "./Task.module.css";
import { CheckCircle, Trash } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

interface TaskProps{
  id: string;
  content: string;
  isCompleted?: boolean;
  deleteTask:(taskId:string) =>void;
  onCheck:(taskId:string) => void
}

export function Task({id,content,isCompleted,deleteTask,onCheck}:TaskProps) {

  function HandleDeleteTask(){
    deleteTask(id);
  }

  function HandleCheckTesk(){
    onCheck(id);
  }

  const teste= true;

  return(
    <div className={styles.task}>
      <div className={styles.taskContent}>
        <button onClick={HandleCheckTesk} className={styles.checkContainer}> 
          {isCompleted ? <CheckCircle size={35}/> : <div/>}
        </button>
        
        <div className={styles.content}>
          <p className={isCompleted ? styles.completed: ""}> {content}</p>
        </div>
      </div>
      
      <button title="Deletar comentário" onClick={HandleDeleteTask}>
        <Trash size={18} />
      </button>
    </div>
  )
}