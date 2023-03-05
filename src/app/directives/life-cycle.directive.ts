import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
  selector: "[appLifeCycle]",
  standalone: true,
})
export class LifeCycleDirective implements OnDestroy {
  private destroySubject = new Subject<void>();
  readonly destroy$ = this.destroySubject.asObservable();

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
