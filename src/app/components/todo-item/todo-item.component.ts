import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo';
import { selectTodoById } from 'src/app/store/todo/todo.selectors';
import { todoActions } from 'src/app/store/todo/todo.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  template: `
    <div [ngStyle]="{ border: '1px solid grey', padding: '1em' }">
      <h3>{{ todo.id + ' - ' + todo.title }}</h3>
      <button (click)="deleteTodo()">Delete</button>
      <button (click)="toggleTodo()">
        {{ todo.completed ? 'Mark as Incomplete' : 'Mark as Complete' }}
      </button>
      <button (click)="toggleEdit()">Edit Todo</button>

      <div *ngIf="showEdit">
        <input
          type="text"
          [(ngModel)]="title"
          name="title"
        />
        <button (click)="editTodo()">Save</button>
        <button (click)="toggleEdit()">Cancel</button>
      </div>
    </div>
  `,
  styles: [],
})
export class TodoItemComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  @Input() todoId: number = -1; // The single todoId received from the AppComponent, used later for selecting individual todos from the store.

  todo: Todo = {} as Todo;

  showEdit: boolean = false;

  title: string = '';

  selectTodoByIdSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.selectTodoByIdSubscription = this.store
      .select(selectTodoById(this.todoId))
      .subscribe({
        next: (todo) => {
          if (!todo) return;
          this.todo = todo;
          this.title = todo.title;
        },
      });
    // select the single todo data according to the todoId Input
  }

  ngOnDestroy(): void {
    this.selectTodoByIdSubscription?.unsubscribe();
  }

  deleteTodo(): void {
    console.info(
      '%cTodoItemComponent: delete action dispatched',
      'color: yellow',
    );
    this.store.dispatch(todoActions.delete({ id: this.todoId }));
  }

  toggleTodo(): void {
    console.info(
      '%cTodoItemComponent: toggle action dispatched',
      'color: yellow',
    );
    this.store.dispatch(todoActions.toggle({ id: this.todoId }));
  }

  toggleEdit(): void {
    this.showEdit = !this.showEdit;
    this.title = this.todo.title;
  }

  editTodo(): void {
    if (!this.title.length) return;
    const updatedTodo: Todo = {
      ...this.todo,
      title: this.title,
    };
    console.info(
      '%cTodoItemComponent: update action dispatched',
      'color: yellow',
    );
    this.store.dispatch(todoActions.update({ updatedTodo }));
  }
}
