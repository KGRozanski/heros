import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChipInputComponent } from '../chip-input/chip-input.component';
import { SpecialCharacters } from 'src/app/core/interfaces/specialCharacters.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.races = this.route.snapshot.data['races'];
    console.log(this.races);
  }
  private races;
  private specialCharacters: SpecialCharacters[];

  private heroForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    race: ['', Validators.required],
    profession: [''],
    age: ['', Validators.pattern('^[0-9]+$')],
    birth_place: [''],
    look: this.fb.group( {
      height: ['', Validators.pattern('^[0-9]+$')],
      hair: [''],
      eyes: [''],
      skin: [''],
      specialCharacters: ['']
    }),
    strength: ['', Validators.pattern('^[0-9]+$')],
    endurance: ['', Validators.pattern('^[0-9]+$')],
    agility: ['', Validators.pattern('^[0-9]+$')],
    intelligence: ['', Validators.pattern('^[0-9]+$')],
    charisma: ['', Validators.pattern('^[0-9]+$')],
    description: this.fb.group({
      title: [''],
      content: ['']
    })
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.heroForm.value);
  }

  receiveCharacters($event) {
    this.specialCharacters = $event;
    let specialChars = [];
    // Push special characters to new array
    this.specialCharacters.forEach((val) => {
      specialChars.push(val.name);
    })
    //Set heroForm control value to array of specials
    this.heroForm.patchValue(
      {look:{specialCharacters: specialChars}
    });
  }
}
