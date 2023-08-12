import TodoModel from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const todo = new TodoModel({
      owner: req.body.owner,
      text: req.body.text,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({
      message: "Тодо лист не создан",
    });
  }
};

export const getTodo = async (req, res) => {
  try {
    const userId = req.query.userId;
    const todo = await TodoModel.find({ owner: userId });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({
      message: "Тодо лист не найден",
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updates = req.body; // Обновленные данные приходят в теле запроса

    // Используем метод findByIdAndUpdate для обновления элемента по его id
    const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, updates, {
      new: true, // Возвращать обновленный элемент
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Тодо лист не найден" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({
      message: "Ошибка при обновлении тодо листа",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // Используем метод findByIdAndDelete для удаления элемента по его id
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Тодо лист не найден" });
    }

    res.status(200).json({ message: "Тодо лист успешно удален" });
  } catch (err) {
    res.status(500).json({
      message: "Ошибка при удалении тодо листа",
    });
  }
};

export const completedTodo=async(req, res)=>{
  try {
    const todo = await TodoModel.findOne({ _id: req.params.id });
    todo.completed=!todo.completed
    await todo.save()
    res.json(todo)
  } catch (err) {
    console.log(err);
  }
}