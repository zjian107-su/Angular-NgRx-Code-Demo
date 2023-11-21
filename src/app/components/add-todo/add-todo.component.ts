import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { todoActions } from 'src/app/store/todo/todo.actions';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'app-add-todo',
  template: `
    <form (ngSubmit)="addTodo()">
      <input
        type="text"
        name="title"
        [(ngModel)]="title"
        placeholder="Todo Title"
      />
      <button type="submit">Add Todo</button>
    </form>
  `,
  styles: [],
})
export class AddTodoComponent {
  @Input() lastTodoId: number = -1;

  constructor(private store: Store) {}

  title: string = '';

  addTodo(): void {
    const newTodo: Todo = {
      id: this.lastTodoId + 1,
      title: this.title,
      completed: false,
    };

    console.info('%cAddTodoComponent: add action dispatched', 'color: yellow');
    this.store.dispatch(todoActions.add({ newTodo }));
    this.title = '';
  }
}
