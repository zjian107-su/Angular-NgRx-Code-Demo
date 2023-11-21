import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo';

export const selectTodoState =
  createFeatureSelector<ReadonlyArray<Todo>>('todo');
// This is a feature selector which selects a specific slice (feature) of the entire state. The argument passed in (in our case 'todo') should match the key you provided in app.module.ts in the imports array
// StoreModule.forRoot({ todo: todoReducer })

export const selectTodoIds = createSelector(
  selectTodoState, // select the entire feature state first.
  (state) => state.map((todo) => todo.id), // the callback function's input data is the data returned by the selectTodoState feature selector.
  // You can chain multiple callback functions in the createSelector function, each callback function takes in the previous callback's output data as its input.
  // The output of the last callback function is the output of the entire createSelector function.
);
// createSelector creates a memoized selector because selectors are pure functions, as long as the input doesn't change, this selector will return the memoized value

export const selectTodoById = (id: number) =>
  createSelector(selectTodoState, (state) =>
    state.find((todo) => todo.id === id),
  );
// You can create a function that returns a selector if you want to pass in arguments when selecting your data.

export const selectTodoIdsByTitle = (title: string) =>
  createSelector(selectTodoState, (state) =>
    state
      .filter((todo) => todo.title.toLowerCase().includes(title.toLowerCase()))
      .map((todo) => todo.id),
  );
