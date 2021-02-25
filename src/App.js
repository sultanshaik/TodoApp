import TaskList from './components/task-list';
import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {sortFunc} from './utils/helper';

const  config = {
  method: 'get',
  url: 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get',
  headers: { 
    'X-Api-Key': ' PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c' }
};

function App() {

  const [taskList, setTaskList] = useState(null);

  const updateTask =(taskId , isComplete)=>{
    const copyTaskList = [...taskList];

    const indexOfTask = copyTaskList.findIndex(task=>task.id===taskId);
    copyTaskList[indexOfTask].isComplete = isComplete;
    copyTaskList.sort((task1, task2)=>sortFunc(task1, task2));
    setTaskList([...copyTaskList])
  }


  useEffect(()=>{
    const getTaskList = async () =>{
      try{
        const {data} = await axios(config);
        const normalizedTaskList = data.map(response=>{
          const task = {};
          task.id = response.id;
          task.description = response.description;
          task.dueDate = response.dueDate? new Date(response.dueDate).toLocaleDateString():"";
          task.date = response.dueDate? new Date(response.dueDate):null;
          task.isComplete = response.isComplete;
          task.isUrgent = task.isComplete? false : task.date? task.date.getTime() < new Date().getTime():false;
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
    <div className="container-App">
    <h1>Todo App </h1>  
    <TaskList taskList= {taskList} updateTask={updateTask} />
    </div>
  );
}

export default App;
