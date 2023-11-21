import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take, tap } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // If you are using NgRx for state management, your service should be single-responsibility, meaning that it is only used for making HTTP requests and do not store any data in your services
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Array<Todo>> {
    return this.http
      .get<Array<Todo>>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        tap(() =>
          console.info('%cTodoService: all todos received', 'color:yellow'),
        ),
        map(
          (todos) =>
            todos.slice(0, 5).map((todo) => ({
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
            })), // only return the first 5 todos
        ),
      );
  }
}
