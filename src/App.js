import TaskList from './components/task-list';
import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const  config = {
  method: 'get',
  url: 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get',
  headers: { 
    'X-Api-Key': ' PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c' }
};

function App() {

  const [taskList, setTaskList] = useState(null);

  useEffect(()=>{
    const getTaskList = async () =>{
      try{
        const {data} = await axios(config);
        const normalizedTaskList = data.map(response=>{
          const task = {};
          task.id = response.id;
          task.description = response.description;
          task.dueDate = response.dueDate? new Date(response.dueDate).toLocaleDateString():"";
          task.isComplete = response.isComplete; 
          return task;
        })
        setTaskList(normalizedTaskList);
      }
      catch(e){
        console.log(e);
      }
    }
    getTaskList();
  }, [])

  return (
    <div>
    <TaskList taskList= {taskList} />
    </div>
  );
}

export default App;
