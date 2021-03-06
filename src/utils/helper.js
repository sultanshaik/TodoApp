
const sortByDate = (firstDate, secondDate)=>{
    if(firstDate && secondDate)
    return new Date(firstDate).getTime() - new Date(secondDate).getTime();
    else{
        if(!firstDate)
        return 1;
        else
        return -1;
    }
}

const sortFunc =(task1, task2)=>{
    if(task1.isComplete - task2.isComplete !==0){
      return task1.isComplete - task2.isComplete;
    }
    else{
      return sortByDate(task1.date, task2.date);
    }
  }

const getTaskPriority = (task) =>{
    return task.isComplete ? 'completed' : task.isUrgent ? 'urgent':'pending';
}  
export {sortFunc , getTaskPriority};