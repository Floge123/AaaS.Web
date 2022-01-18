import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService} from '../../shared/services/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;
  myForm: FormGroup;
  validKey: boolean;

  constructor(private auth: AuthenticationService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.auth.appKey.next(sessionStorage.getItem('AaaS.appKey'));
    this.myForm = new FormGroup({
      key: new FormControl()
    });

    this.auth.loggedIn.subscribe(r => this.loggedIn = r);
    this.auth.appKey.subscribe(key => {
      this.myForm = this.fb.group({
        key: [key, Validators.required]
      });
      this.validKey = key !== null;
    })
  }

  submitForm() {
    this.auth.checkAppKey(this.myForm.value.key)
      .subscribe(r => this.validKey = r !== null);
  }

}
