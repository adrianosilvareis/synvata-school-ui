import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Display {
  id: string;
  name: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit{
  @Input() title: string = 'Filter';
  @Input() modelValue: string = '';
  @Input() options: Display[] = [];
  @Output() filter = new EventEmitter();

  myControl = new FormControl<string | Display>('');
  filteredOptions: Observable<Display[]>;

  private prevent = false;

  constructor() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (!value && this.prevent) {
          this.filter.emit()
        }
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: Display): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Display[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSelect() {
    this.filter.emit(this.myControl.value)
    this.prevent = true
  }

  ngOnInit(): void {
    if (this.modelValue) {
      const option = this.options.find(option => option.id == this.modelValue) ?? ''
      this.myControl.setValue(option)
      this.myControl.disable()
    }
  }
}
