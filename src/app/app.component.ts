import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { todoActions } from './store/todo/todo.actions';
import {
  selectTodoIds,
  selectTodoIdsByTitle,
} from './store/todo/todo.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-add-todo [lastTodoId]="todoIds[todoIds.length - 1]"></app-add-todo>
      <app-search (handleSearch)="handleSearch($event)"></app-search>
      <div class="container">
        <app-todo-item
          *ngFor="let todoId of todoIds"
          [todoId]="todoId"
        ></app-todo-item>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  todoIds: number[] = []; // array for holding the ids of all todos

  selectTodoIdsSubscription: Subscription | undefined; // subscription for todoIds selector, used for cleanup purposes in ngOnDestroy
  selectTodoIdsByTitleSubscription: Subscription | undefined; // subscription for todoIdsByTitle selector, used for cleanup purposes in ngOnDestroy

  ngOnInit(): void {
    console.info('%cAppComponent: addAll action dispatched', 'color: yellow');
    this.store.dispatch(todoActions.addAll()); // dispatching the addAll action to the store, this action will be handled by the todo effects.
    this.selectTodoIdsSubscription = this.store
      .select(selectTodoIds)
      .subscribe((todoIds) => {
        this.todoIds = todoIds;
      }); // selecting the todoIds using the selectTodoIds selector, which returns an observable and we can subscribe to it and populate our locally stored todoIds array
  }

  ngOnDestroy(): void {
    this.selectTodoIdsSubscription?.unsubscribe();
    this.selectTodoIdsByTitleSubscription?.unsubscribe();
  }

  handleSearch(query: string): void {
    this.selectTodoIdsByTitleSubscription = this.store
      .select(selectTodoIdsByTitle(query))
      .subscribe((todoIds) => (this.todoIds = todoIds));
    // Given the search query string we get from our search component, we select the todoIds by title using the selectTodoIdsByTitle selector, which returns an observable and we can subscribe to it and populate our locally stored todoIds array
  }
}
