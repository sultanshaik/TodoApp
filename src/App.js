import TaskList from './components/task-list';
import './App.scss';
import { useEffect, useState } from 'react';

import TodoApi from './utils/api'
import TodoList from './todo-list';

const api =  new TodoApi();
const todoList= new TodoList();

function App() {

  const [taskList, setTaskList] = useState([]);
  const [theme , setTheme] = useState('light');

  const apiPatchCall = async (taskId , isComplete) =>{
    try{
      await api.updateTodoList(taskId);
    }
    catch(e){
      todoList.updateTask(taskId,!isComplete);
      setTaskList([...todoList.getData()]);
    }
  }

  const updateTask =(taskId , isComplete)=>{
    todoList.updateTask(taskId, isComplete);
    setTaskList([...todoList.getData()]);
    apiPatchCall(taskId , isComplete);
  }


  useEffect(()=>{
    const getTaskList = async () =>{
      try{
        const {data} = await api.getTodoList();
        todoList.setData(data);
        setTaskList(todoList.getData());
      }
      catch(e){
        console.log(e);
      }
    }
    getTaskList();
  }, [])

  return (
    <div className={`container-App ${theme}`}>
    <h1>Todo App </h1>
    <button onClick = {()=>setTheme(theme=> theme==='light' ? 'dark' : 'light')}>Switch Theme</button>  
    <TaskList taskList= {taskList} updateTask={updateTask} />
    </div>
  );
}

export default App;
