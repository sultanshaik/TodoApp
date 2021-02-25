import {sortFunc} from './utils/helper';

class TodoList {

    constructor(){
        this.todoItems = [];
    }

    setData(data){
        this.normaLizeData(data);
    }

    getTaskUrgency(task){
        return task.isComplete? false : task.date? (task.date.getTime() < new Date().getTime()):false;
     }

    normaLizeData(data){
        this.todoItems = data.map(response=>{
            const task = {};
            task.id = response.id;
            task.description = response.description;
            task.dueDate = response.dueDate? new Date(response.dueDate).toLocaleDateString():"";
            task.date = response.dueDate? new Date(response.dueDate):null;
            task.isComplete = response.isComplete;
            task.isUrgent = this.getTaskUrgency(task);
            return task;
        });
        this.todoItems.sort((task1, task2)=>sortFunc(task1, task2));
    }

    getData(){
        return this.todoItems;
    }

    updateTask(taskId, isComplete){
        const indexOfTask =  this.todoItems.findIndex(task=>task.id===taskId);
        const task = this.todoItems[indexOfTask]
        this.todoItems[indexOfTask].isComplete = isComplete;
        this.todoItems[indexOfTask].isUrgent  = this.getTaskUrgency(task);
        this.todoItems.sort((task1, task2)=>sortFunc(task1, task2));
    }

}

export default TodoList;