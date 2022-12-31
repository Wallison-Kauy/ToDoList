import styles from "./App.module.css";
import { Header } from './componets/Header'
import { TaskIsEmpety } from './componets/TaskIsEmpety'
import "./global.css"
import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from "./componets/Tasks";

const LOCAL_STORAGE_KEY = "todo:savedTasks"

export interface Task{
  id: string;
  content: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const taskLength:number = tasks.length;
  const taskCompleted:number = tasks.filter((task)=>task.isCompleted).length;

  function loadSavedTasks(){
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved){
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(()=> {
    loadSavedTasks();
  }, [])

  function setTaskAndSave(NewTask: Task[]){
    setTasks(NewTask);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(NewTask));
  }

  function handleTaskTextChange(event: FormEvent){
    event.preventDefault();

     const CreatNewTask:Task  ={
      id: uuidv4(),
      content: newTaskText,
      isCompleted: false,
    }

    setTaskAndSave([...tasks, CreatNewTask])
    setNewTaskText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function renderNotTask(){
    if(tasks.length == 0){
      return  <TaskIsEmpety/>
    } 
  }

  function deleteTask(taskId:string){
    const newTasks = tasks.filter((task)=> task.id !== taskId);
    setTaskAndSave(newTasks);
  }

  function toggleCompleteTaskById(taskId:string){
    const newTask = tasks.map(task =>{
      if(task.id === taskId){
        return{
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task;
    })
    //Ordenando a lista para as tasks true ficarem em primeiro
    //Referencia: https://codingbeautydev.com/blog/javascript-sort-object-array-by-boolean-property/#:~:text=To%20sort%20an%20array%20of,a%20negative%20number%2C%20or%20zero.
    newTask.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    setTaskAndSave (newTask);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  return (
    <div>
     <Header />
     <article>
      <header>
        <form onSubmit={handleTaskTextChange} className={styles.form}>
          <textarea
            name="task"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewCommentChange}
            required
            onInvalid={handleNewCommentInvalid}
          />
          <button type="submit" >Criar <PlusCircle size={20}/> </button>
        </form>
      </header>

      <div className={styles.tasklist}>
        <header className={styles.header}>
          <div className={styles.concluido}>
            <h1>Tarefas criadas </h1>
            <span> {taskLength} </span>
          </div>
          <div className={styles.concluido}>
           <h2>Concluidas</h2>
           <span>{taskCompleted} de {taskLength}</span>
          </div>
        </header>
        {renderNotTask()}
        <div>
          {tasks.map(task=>{
            return (
              <Task 
                id={task.id} 
                content={task.content} 
                isCompleted={task.isCompleted}
                key={task.id}
                deleteTask={deleteTask}
                onCheck={toggleCompleteTaskById}
              />
            )
          })}
        </div>
      </div>
    </article>
    </div>
  )
}

export default App
