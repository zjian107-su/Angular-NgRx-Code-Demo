import { createReducer, on } from '@ngrx/store';
import { todoActions } from './todo.actions';
import { Todo } from 'src/app/interfaces/todo';

const initialState: ReadonlyArray<Todo> = []; // State in NgRx store should be immutable

// reducer functions must be pure functions, meaning no side effects, not mutating the state directly, and given the same input should always produce the same output
export const todoReducer = createReducer(
  initialState, // pass in the initial state as a first argument in the createReducer function

  on(todoActions.add, (state, { newTodo }) => {
    console.info(
      '%cReducer: add action received, updating state',
      'color: yellow',
    ); // You should never console.log in reducer functions because console.log is a side effect, and reducer functions must be pure functions. This is just for demonstration purpose.
    return [...state, newTodo]; // make a copy of the current state and add the new todo into the copy and then return the newly modified copy. This kind of logic should be applied to all reducer functions.
  }), // we use the on function to create state update logic for different actions, the first argument is the type of action, the second argument is a callback function that takes in the entire state of the current reducer, and a payload if there is any.

  on(todoActions.addAllSuccess, (_state, { todos }) => {
    console.info(
      '%cReducer: addAllSuccess action received, updating state',
      'color: yellow',
    );
    return [...todos];
  }),

  on(todoActions.delete, (state, { id }) => {
    console.info(
      '%cReducer: delete action received, updating state',
      'color: yellow',
    );
    return state.filter((todo) => todo.id !== id); // Array.filter() returns a new array, so we are not directly mutating the state. Same thing for Array.map().
  }),

  on(todoActions.update, (state, { updatedTodo }) => {
    console.info(
      '%cReducer: update action received, updating state',
      'color: yellow',
    );
    return state.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    });
  }),

  on(todoActions.toggle, (state, { id }) => {
    console.info(
      '%cReducer: toggle action received, updating state',
      'color: yellow',
    );
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  }),
);
