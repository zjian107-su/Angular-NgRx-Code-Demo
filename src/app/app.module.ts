import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { todoReducer } from './store/todo/todo.reducer';
import { TodoEffects } from './store/todo/todo.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { SearchComponent } from './components/search/search.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    SearchComponent,
    AddTodoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ todo: todoReducer }), // Register your reducers, the key represents the name of the slice of state in the store (used when creating feature selectors)
    EffectsModule.forRoot([TodoEffects]), // Register your effects
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }), // enabling NgRx devtools, which you can then use the Redux devtools in your browser to check the states and actions
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
