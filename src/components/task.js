import {getTaskPriority} from '../utils/helper';

const Task =(props) =>{
    const {task, updateTask} = props;
    return <div className={`taskItem ${getTaskPriority(task)}`}>
          <div>
            <input type="checkbox" name={`task ${task.id}`}  checked={task.isComplete}
                onChange={()=>{
                    updateTask(task.id, !task.isComplete);
                }}
            />
            <label htmlFor={`task ${task.id}`}>{task.description}</label>
        </div>
        <span>{task.dueDate}</span>
        </div>
}
export default  Task;