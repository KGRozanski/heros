import { Component, EventEmitter, Output } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { SpecialCharacters } from 'src/app/core/interfaces/specialCharacters.interface';



@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent {

  @Output() specialCharEvent = new EventEmitter<SpecialCharacters[]>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  specials: SpecialCharacters[] = [
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.specials.push({name: value.trim()});
      this.specialCharEvent.emit(this.specials);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: SpecialCharacters): void {
    const index = this.specials.indexOf(fruit);

    if (index >= 0) {
      this.specials.splice(index, 1);
      this.specialCharEvent.emit(this.specials);
    }
  }
}