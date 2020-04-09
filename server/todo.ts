import express from "express";
const router = express.Router();
const todoList: Todo[] = [];

class Todo {
  private _id: number;
  private _name: string;
  private _done: boolean;
  constructor(id: number, name: string, done: boolean) {
    this._id = id;
    this._name = name;
    this._done = done;
  }

  getId() {
    return this._id;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      done: this._done,
    };
  }
}

router.post("/", (req, res, next) => {
  const id: number = todoList.length
    ? todoList[todoList.length - 1].getId() + 1
    : 0;
  const item = new Todo(id, req.body.name, false);
  todoList.push(item);
  return res.status(201).send(item);
});

router.get("/", (req, res, next) => {
  return res.send({ todoList: todoList });
});

router.patch("/:id", (req, res, next) => {
  const id: number = Number(req.params.id);
  const todo: any = todoList.find((todo) => todo.getId() == id);
  const { name, done } = req.body;
  todo._name = name;
  todo._done = done;
  return res.status(201).send(todo);
});

router.delete("/:id", (req, res, next) => {
  const id: number = Number(req.params.id);
  const index = todoList.findIndex((todo) => todo.getId() == id);
  todoList.splice(index, 1);
  return res.status(204).send("done");
});

export default router;
