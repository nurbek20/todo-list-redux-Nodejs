import React,{useEffect} from "react";
import Home from "./home/home";
import Login from "./auth/login";
import Register from "./auth/register";
import { Routes, Route,Navigate } from "react-router-dom";
import { Container } from "@mui/material"
import { useSelector,useDispatch } from 'react-redux'
import { getMeReduxServices } from "../redux/services";
import { todoServices } from "../http/todo-services";
import { getTodoList } from "../redux/todo-action/todo-action";

const Main = () => {
  const {user}=useSelector(state=>state.authReducer)
  const {todos}=useSelector(state=>state.todoReducer)
  const userId=user._id
  const dispatch=useDispatch()
  useEffect(()=>{
    const getTodo=async()=>{
     const data=await todoServices.getTodoServices(userId)
     dispatch(getTodoList(data.data))
    }
    getTodo()
   },[todos])
  useEffect(()=>{
    dispatch(getMeReduxServices())
    
  }, [])

 

  return (
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={user.fullName?<Home/>:<Register/>} />
          <Route exact path="/auth-sign-in" element={user.fullName?<Navigate to='/' replace />:<Login/>} />
          <Route exact path="/auth-register" element={user.fullName?<Navigate to='/' replace />:<Register />} />
        </Routes>
      </Container>
  );
};

export default Main;
