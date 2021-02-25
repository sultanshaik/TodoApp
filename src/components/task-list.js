import Task from './task';

const TaskList =(props) =>{
    const {taskList, updateTask} = props;
    return <div className="taskList">

        {taskList? taskList.map((task, index)=><Task key={index} task = {task} updateTask={updateTask}/>):""}
        </div>
}
export default  TaskList;