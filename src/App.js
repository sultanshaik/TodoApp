import TaskList from './components/task-list';
import './App.scss';
import { useEffect, useState } from 'react';

import {sortFunc} from './utils/helper';
import TodoApi from './utils/api'

const api =  new TodoApi();

const getTaskUrgency = (task) =>{
   return task.isComplete? false : task.date? (task.date.getTime() < new Date().getTime()):false;
}

function App() {

  const [taskList, setTaskList] = useState(null);
  const [theme , setTheme] = useState('light');

  const updateTaskList = (copyTaskList,indexOfTask, isComplete) =>{
    const task = copyTaskList[indexOfTask];
    copyTaskList[indexOfTask].isComplete = isComplete;
    copyTaskList[indexOfTask].isUrgent  = getTaskUrgency(task);
    copyTaskList.sort((task1, task2)=>sortFunc(task1, task2));
    setTaskList([...copyTaskList]);
  }

  const apiPatchCall = async (taskId , isComplete) =>{
    try{
      await api.updateTodoList(taskId);
    }
    catch(e){
      console.log(e);
      const copyTaskList = [...taskList];
      const indexOfTask = copyTaskList.findIndex(task=>task.id===taskId);
     updateTaskList(copyTaskList,indexOfTask,!isComplete);
    }
  }

  const updateTask =(taskId , isComplete)=>{
    const copyTaskList = [...taskList];
    const indexOfTask = copyTaskList.findIndex(task=>task.id===taskId);
    updateTaskList(copyTaskList,indexOfTask, isComplete);
    apiPatchCall(taskId , isComplete);
  }


  useEffect(()=>{
    const getTaskList = async () =>{
      try{
        const {data} = await api.getTodoList();
        const normalizedTaskList = data.map(response=>{
          const task = {};
          task.id = response.id;
          task.description = response.description;
          task.dueDate = response.dueDate? new Date(response.dueDate).toLocaleDateString():"";
          task.date = response.dueDate? new Date(response.dueDate):null;
          task.isComplete = response.isComplete;
          task.isUrgent = getTaskUrgency(task);
          return task;
        });
        normalizedTaskList.sort((task1, task2)=>sortFunc(task1, task2));
        setTaskList(normalizedTaskList);
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
