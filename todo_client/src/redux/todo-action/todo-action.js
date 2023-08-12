import { GET_TODO } from "../types";


export const getTodoList=(data)=>{
    return{
        type:GET_TODO,
        payload:data
    }
}