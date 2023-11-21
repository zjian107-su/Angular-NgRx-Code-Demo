import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo';

export const todoActions = createActionGroup({
  source: 'Todo', // This is the name of the action group, can be viewed in Redux Devtool. Ex. [Todo] add
  events: {
    add: props<{ newTodo: Todo }>(), // The type of the action is 'add', the payload is newTodo.
    addAll: emptyProps(), // We don't need any payload for this action, so we use emptyProps(). This action is simply used to trigger todo effects.
    addAllSuccess: props<{ todos: Array<Todo> }>(), // This action is used inside of todo effects after retrieving data from the API to populate the todo list.
    delete: props<{ id: number }>(),
    update: props<{ updatedTodo: Todo }>(),
    toggle: props<{ id: number }>(),
  },
});
