import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  private heroForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required]
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.heroForm.value);
  }
}
