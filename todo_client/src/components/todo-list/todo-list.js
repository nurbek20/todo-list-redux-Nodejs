import React from "react";
import styles from "./todo-list.module.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TodoList = (props) => {
  const {
    text,
    index,
    deleteTodoList,
    startEditing,
    editingTodoId,
    updateTodoList,
    todoList,
    setTodoList,
    deleteChange,
    completed,
  } = props;
  const isEditing = editingTodoId === props._id;

  return (
    <div className={styles.todos_item}>
      <div className={styles.todos_num}>{index + 1}</div>
      {isEditing ? (
        <div className="update-todo">
          <TextField
            id="standard-basic"
            label="Great Todo"
            fullWidth
            variant="standard"
            value={todoList}
            placeholder={text}
            onChange={(e) => setTodoList(e.target.value)}
          />
          <Button onClick={updateTodoList} type="submit" variant="contained">
            Дабавить
          </Button>
        </div>
      ) : (
        <>
          {completed ? (
            <div onClick={deleteChange} className={styles.todos_text}>
              {text}
            </div>
          ) : (
            <div onClick={deleteChange} className={styles.todo_del}>
              {text}
            </div>
          )}
          <div className={styles.todos_buttons}>
            <button style={{cursor:completed?"pointer":null}} className={styles.btn} disabled={completed?false:true}>
            <CreateIcon onClick={completed?startEditing:null} />
            </button>

            <button style={{cursor:completed?null:"pointer"}} className={styles.btn} disabled={completed}>
              <DeleteIcon onClick={completed?null:deleteTodoList} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
