import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface DisplayMultiSelect {
  id: string;
  name: string;
}

@Component({
  selector: 'app-multiselect-chips',
  templateUrl: './multiselect-chips.component.html',
  styleUrls: ['./multiselect-chips.component.scss']
})
export class MultiselectChipsComponent implements OnInit {

  @Input() chips: DisplayMultiSelect[] = [];
  @Input() allChips: DisplayMultiSelect[] = [];
  @Input() title: string = 'Filter'

  @Output() update = new EventEmitter();

  chipCtrl = new FormControl('');
  filteredChips$: Observable<DisplayMultiSelect[]>;

  constructor() {
    this.filteredChips$ = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      map((input: string | null) => (input ? this._filter(input) : this.allChips.slice())),
    )
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addInChips(value);
    }

    event.chipInput!.clear();

    this.chipCtrl.setValue(null);
  }

  private addInChips(name:string) {
    const chip = this.allChips.find(chip => chip.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) as DisplayMultiSelect

    const index = this.chips.findIndex(({ id }) => chip.id == id)

    if (index < 0) {
      this.chips.push(chip)
      this.update.emit(this.chips)
    }
  }

  remove(chip: DisplayMultiSelect): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
      this.update.emit(this.chips)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addInChips(event.option.viewValue)
    this.chipCtrl.setValue(null);
  }

  private _filter(value: any): DisplayMultiSelect[] {
    const valueFilter = value.id ? value.name.toLocaleLowerCase() : value.toLocaleLowerCase();
    return this.allChips.filter(chip => chip.name.toLocaleLowerCase().includes(valueFilter));
  }

  ngOnInit(): void {

  }
}
