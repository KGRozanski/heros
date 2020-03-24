import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecialCharacters } from 'src/app/core/interfaces/specialCharacters.interface';
import { HeroService } from 'src/app/core/services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private hs: HeroService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.races = this.route.snapshot.data['races'];
  }

  private editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    uploadUrl: 'https://herospace.pl/api/hero/8/avatar',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['insertVideo'],
      ['fontSize']
    ]
  };


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
      strenght: [null, Validators.pattern('^[0-9]+$')],
      endurance: [null, Validators.pattern('^[0-9]+$')],
      agility: [null, Validators.pattern('^[0-9]+$')],
      intelligence: [null, Validators.pattern('^[0-9]+$')],
      charisma: [null, Validators.pattern('^[0-9]+$')],
    }),
    htmlContent: [null]
    // description: this.fb.array([ this.createDescription() ]),
  });

  private stats = {
    strenght: 0,
    endurance: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0
  }

  changeStats(property, value) {
    this.stats[property] = value;
  }



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
      console.log(data);
      this.snackBar.open(data['message'], null, {duration: 3000})
    })
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
