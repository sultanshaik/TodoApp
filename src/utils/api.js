import axios from 'axios';

class TodoApi {
    
    getTodoList = ()=>{
        const  config = {
            method: 'get',
            url: 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get',
            headers: { 
              'X-Api-Key': ' PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c' }
          };
        
        return axios(config);  

    } 
    
    updateTodoList = (taskId , status)=>{
        const config = {
            method: 'patch',
            url: `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${taskId}`,
            headers: { 
              'X-Api-Key': ' PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c', 
              'Content-Type': ' application/json' 
            },
            data : {isComplete : status}
          };
        
        return axios(config);  

    } 
      
}

export default TodoApi;