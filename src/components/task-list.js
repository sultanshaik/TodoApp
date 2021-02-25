import Task from './task';

const TaskList =(props) =>{
    const {taskList} = props;
    return <div className="taskList">

        {taskList? taskList.map((task, index)=><Task key={index} task = {task}/>):""}
        </div>
}
export default  TaskList;