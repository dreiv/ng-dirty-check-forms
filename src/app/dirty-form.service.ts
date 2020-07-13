import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export interface DirtyComponent {
  isDirty$: Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class DirtyFormGuard implements CanDeactivate<DirtyComponent> {
  canDeactivate(component: DirtyComponent) {
    return component.isDirty$.pipe(
      switchMap((dirty: any) => {
        if (dirty === false) {
          return of(true);
        }

        return of(
          confirm('You have unsaved changes. Are you sure you want to leave?')
        );
      }),
      take(1)
    );
  }
}
