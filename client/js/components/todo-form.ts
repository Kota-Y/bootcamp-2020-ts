import store from "../store.js";
import { createAddTodoAction } from "../flux/index.js";

class TodoForm {
  button: HTMLInputElement;
  form: HTMLInputElement;
  constructor() {
    const button = document.querySelector(".todo-form__submit");
    const form = document.querySelector(".todo-form__input");
    if (!button) throw new Error("no button");
    if (!form) throw new Error("no button");
    this.button = button as HTMLInputElement;
    this.form = form as HTMLInputElement;
  }

  mount() {
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      store.dispatch(createAddTodoAction({ name: this._form.value }));
      this.form.value = "";
    });
  }
}

export default TodoForm;
