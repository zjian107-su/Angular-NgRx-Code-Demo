import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <input
      type="text"
      name="query"
      [(ngModel)]="query"
      (ngModelChange)="handleChange()"
      placeholder="Search By Title"
    />
  `,
  styles: [],
})
export class SearchComponent {
  @Output() handleSearch = new EventEmitter<string>();
  query: string = '';

  handleChange(): void {
    this.handleSearch.emit(this.query);
  }
}
