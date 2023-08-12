import React, { useState } from "react";
import TodoList from "../../components/todo-list/todo-list";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { todoServices } from "../../http/todo-services";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { todos } = useSelector((state) => state.todoReducer);
  const userId = user._id;
  const [data, setData] = useState("");
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    await todoServices.createTodoService({
      text: data,
      owner: userId,
    });
    setData("");
  };

  const deleteTodoList = async (id) => {
    await todoServices.deleteTodoServices(id);
  };

  const [editingTodoId, setEditingTodoId] = useState(null);
  const startEditing = (id) => {
    setEditingTodoId(id);
  };

  const [todoList, setTodoList] = useState("");
  const updateTodoList = async (id) => {
    if(todoList){
      await todoServices.updateTodoServices(id, {
        text: todoList,
        owner: userId,
      });
      setEditingTodoId(null);
    }
  };


  const deleteChange=async(id)=>{
       await todoServices.completedTodo(id)
  }

  return (
    <div>
      <form onSubmit={handleCreateTodo}>
        <div className="todos-content">
          <TextField
            id="standard-basic"
            label="Great Todo"
            fullWidth
            variant="standard"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Дабавить
          </Button>
        </div>
      </form>
      <h3>Активные Задачи:</h3>
      <div className="todos">
        {todos.map((elem, i) => {
          return (
            <TodoList
              key={i}
              {...elem}
              index={i}
              deleteTodoList={() => deleteTodoList(elem._id)}
              startEditing={() => startEditing(elem._id)}
              editingTodoId={editingTodoId}
              updateTodoList={() => updateTodoList(elem._id)}
              setTodoList={setTodoList}
              deleteChange={()=>deleteChange(elem._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
