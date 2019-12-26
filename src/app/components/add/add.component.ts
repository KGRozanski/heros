import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecialCharacters } from 'src/app/core/interfaces/specialCharacters.interface';
import { HeroService } from 'src/app/core/services/hero.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private hs: HeroService) { }

  ngOnInit() {
    this.races = this.route.snapshot.data['races'];
  }
  private races;
  private specialCharacters: SpecialCharacters[];
  private descriptions;

  private heroForm = this.fb.group({
    name: [null, Validators.required],
    gender: [null, Validators.required],
    race: [null, Validators.required],
    profession: [null],
    age: [null, Validators.pattern('^[0-9]+$')],
    birth_place: [null],
    look: this.fb.group( {
      height: [null, Validators.pattern('^[0-9]+$')],
      hair: [null],
      eyes: [null],
      skin: [null],
      special_characters: [null]
    }),
    stats: this.fb.group({
      strength: [null, Validators.pattern('^[0-9]+$')],
      endurance: [null, Validators.pattern('^[0-9]+$')],
      agility: [null, Validators.pattern('^[0-9]+$')],
      intelligence: [null, Validators.pattern('^[0-9]+$')],
      charisma: [null, Validators.pattern('^[0-9]+$')],
    }),
    description: this.fb.array([ this.createDescription() ])
  });

  //Function for removing null values from form object
  clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined ) {
        delete obj[propName];
      } else if (obj[propName] instanceof Object == true) {
        this.clean(obj[propName])
      }
    }
  }

  onSubmit() {
    let submittedForm = this.heroForm.value;
    //Remove every null value
    this.clean(submittedForm);   
    console.log(submittedForm);
    this.hs.addHero(this.heroForm.value).subscribe((data) => {
      console.log(data)
    })
  }

  createDescription(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  addDescription(): void {
    this.descriptions = this.heroForm.get('description') as FormArray;
    this.descriptions.push(this.createDescription());
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
      {look:{special_characters: specialChars}
    });
  }
}
