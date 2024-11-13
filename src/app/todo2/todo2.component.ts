import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Todo, TodoStatus, DTOtodo } from './model/todo2';
import { Todo2Service } from './service/todo2.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo2',
  standalone: true,
  imports: [FormsModule],
  providers: [Todo2Service],
  templateUrl: './todo2.component.html',
  styleUrl: './todo2.component.css',
})
export class Todo2Component {
  private Todo2Service = inject(Todo2Service);
  statuses = [TodoStatus.WAITING, TodoStatus.INPROGRESS, TodoStatus.DONE];
  todo: WritableSignal<DTOtodo> = signal({
    name: '',
    content: '',
  });

  addtoDo() {
    this.Todo2Service.addTodos(this.todo());
    this.todo.set({
      name: '',
      content: '',
    });
  }
  getTodos(): Todo[] {
    return this.Todo2Service.getTodos();
  }
  changestatus(todo: Todo, status: TodoStatus) {
    this.Todo2Service.updateTodoStatus(todo, status);
  }
  removeTodo(id: number) {
    this.Todo2Service.removeTodo(id);
  }
  getTodosStatus(status: TodoStatus): Todo[] {
    return this.Todo2Service.getTodosStatus(status);
  }
}
