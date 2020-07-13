import { Observable, combineLatest } from 'rxjs';
import { map, debounceTime, shareReplay } from 'rxjs/operators';

const isEqual = (a: any, b: any) =>
  Object.entries(a).sort().toString() === Object.entries(b).sort().toString();

export function dirtyCheck<U>(source: Observable<U>) {
  return <T>(valueChanges: Observable<T>): Observable<boolean> => {
    const isDirty$ = combineLatest(source, valueChanges).pipe(
      debounceTime(300),
      map(([a, b]) => isEqual(a, b) === false),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    return isDirty$;
  };
}
