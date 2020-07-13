import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { StoreService } from '../store.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DirtyComponent } from '../dirty-form.service';
import { dirtyCheck } from '../utils/dirtyCheck';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, DirtyComponent, OnDestroy {
  private unsubscribe$: Subject<void>;

  settings = new FormGroup({
    settingOne: new FormControl(null),
    settingTwo: new FormControl(null),
    settingThree: new FormControl(true)
  });

  isDirty$!: Observable<boolean>;

  constructor(private store: StoreService) {
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.store.data$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => this.settings.patchValue(state));

    this.isDirty$ = this.settings.valueChanges.pipe(
      dirtyCheck(this.store.data$)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  submit(): void {
    this.store.update(this.settings.value);
  }
}
