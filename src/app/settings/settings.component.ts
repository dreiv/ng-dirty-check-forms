import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings = new FormGroup({
    settingOne: new FormControl(null),
    settingTwo: new FormControl(null),
    settingThree: new FormControl(true)
  });

  constructor() {}

  ngOnInit(): void {}
}
