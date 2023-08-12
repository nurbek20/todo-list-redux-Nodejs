import instance from "./settings";


const createTodoService=(data)=>{
    return instance.post('todo/add',data)
}
const getTodoServices=(userId)=>{
    return instance.get('todo',{
        params:{
            userId:userId
        }
    })
}
const updateTodoServices=(id,data)=>{
    return instance.patch(`todo/update/${id}`,data)
}
const deleteTodoServices=(id)=>{
    return instance.delete(`todo/delete/${id}`,id)
}

const completedTodo=(id)=>{
    return instance.patch(`todo/completed/${id}`)
}


export const todoServices={
    createTodoService,
    getTodoServices,
    updateTodoServices,
    deleteTodoServices,
    completedTodo
}