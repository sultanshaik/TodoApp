const Task =(props) =>{
    const {task} = props;
    return <div>
          <input type="checkbox" name={`task ${task.id}`}
    />
  <label htmlFor={`task ${task.id}`}>{task.description}</label>
        <span>{task.dueDate}</span>
        </div>
}
export default  Task;