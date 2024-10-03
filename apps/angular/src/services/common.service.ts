import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, from, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class CommonService <T> {
  private subscription: Subscription | undefined;
  loading = new BehaviorSubject<boolean>(false)
  data = signal<T | undefined>(undefined)

  execute<Z>(cb: (input: Z) => Promise<T>, input: Parameters<typeof cb>[0]) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.loading.next(true)

    const call = from(cb(input)).pipe(
      tap(() => this.loading.next(false)),
      catchError((error) => {
        this.loading.next(false)
        return throwError(() => error);
      })
    )

    call.subscribe({
      next: (response) => this.data.set(response),
      error: (error) => console.error('Error:', error),
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
