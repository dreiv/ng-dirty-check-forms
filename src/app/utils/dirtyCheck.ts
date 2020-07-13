import { Observable, combineLatest, fromEvent, Subscription } from 'rxjs';
import {
  map,
  debounceTime,
  shareReplay,
  finalize,
  startWith
} from 'rxjs/operators';

export function dirtyCheck<U>(source: Observable<U>) {
  let subscription: Subscription;
  const isDirty = false;

  return <T>(valueChanges: Observable<T>): Observable<boolean> => {
    const isDirty$ = combineLatest(source, valueChanges).pipe(
      debounceTime(300),
      map(([a, b]) => !Object.is(a, b)),
      finalize(() => subscription.unsubscribe()),
      startWith(false),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    subscription = fromEvent(window, 'beforeunload').subscribe((event: any) => {
      isDirty && (event.returnValue = false);
    });

    return isDirty$;
  };
}
