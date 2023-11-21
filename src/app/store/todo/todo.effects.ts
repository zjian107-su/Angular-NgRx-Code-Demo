import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { todoActions } from './todo.actions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      // actions$ is an observable of all actions dispatched
      ofType(todoActions.addAll), // ofType filters an Observable of all Actions into an Observable of the actions we specified, in our case, it's the addAll action
      tap(() =>
        console.info('%cEffect: addAll action received', 'color: yellow'),
      ),
      exhaustMap(() => {
        // you can use mergeMap, concatMap, switchMap, exhaustMap here if you only have one action specified in ofType(), if you have more than one actions in ofType(), then you have to decide which kind of Map operator you have to use depending on your logic
        console.info('%cEffect: invoking todoService', 'color: yellow');
        return this.todoService.getAllTodos().pipe(
          map((todos) => todoActions.addAllSuccess({ todos })), // mapping the todos data from the API into the addAllSuccess action, this action will be handled by the corresponding reducer
          tap(() =>
            console.info(
              '%cEffect: addAllSuccess action dispatched',
              'color: yellow',
            ),
          ),
          catchError(() => EMPTY),
        );
      }),
    ),
  );
}
